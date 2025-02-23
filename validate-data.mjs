#!/usr/bin/env node
import Ajv from "ajv";
import Debug from "debug";
import fs from "node:fs/promises";
import jsYaml from "js-yaml";
import path from "node:path";
import { fileURLToPath } from "node:url";

async function validate(filename, validator) {
    debug(`Validating: ${filename}`);
    const contents = await fs.readFile(filename, "utf8");
    const data = jsYaml.load(contents);
    const isValid = validator(data);

    if (!isValid) {
        errorsFound += 1;
        console.error(`Error in data file: ${filename}
${showErrors(validator.errors)}
`);
    }
}

async function validateGlob(glob, validator) {
    debug(`Pattern matching: ${glob}`);
    for await (const file of fs.glob(glob)) {
        await validate(file, validator);
    }
}

function showErrors(errors) {
    let maxDepth = 0;

    return errors
        .map((error) => {
            error.depth = error.instancePath.split("/").length;
            maxDepth = Math.max(error.depth, maxDepth);
            return error;
        })
        .sort((a, b) => a.depth - b.depth)
        .filter((error) => error.depth === maxDepth)
        .map((error) => showError(error))
        .join("\n");
}

function showError(error) {
    return `    ${error.instancePath}: ${error.message}`;
}

const debug = Debug("validateData");

// Load schemas to validata data. This is not recursive
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const schemaFolder = path.resolve(__dirname, "schemas");
const schemas = {};

for (const fn of await fs.readdir(schemaFolder)) {
    if (fn.match(/^[^.]/) && fn.match(/\.json$/)) {
        const resolvedFilename = path.resolve(schemaFolder, fn);
        debug(`Loading schema: ${resolvedFilename}`);
        const schema = JSON.parse(await fs.readFile(resolvedFilename, "utf8"));
        schema.$id = fn;
        schemas[fn] = schema;
    }
}

const ajv = new Ajv({ schemas: Object.values(schemas) });
let errorsFound = 0;

const mappings = {
    'src/data/events.yaml': 'events.json',
    'src/data/historical-merit-badges.json': 'historical-merit-badges.json',
    'src/data/merit-badges.json': 'merit-badges.json',
    'src/data/merit-badges/**/requirements.yaml': 'requirement-list.json',
    'src/data/nova-awards.json': 'nova-awards.json',
    'src/data/nova-lab/**/*.yaml': 'requirement-list.json',
    'src/data/other-awards.json': 'other-awards.json',
    'src/data/other-awards/**/*.yaml': 'requirement-list.json',
    'src/data/scout-ranks.json': 'scout-ranks.json',
    'src/data/scout-ranks/**/*.yaml': 'requirement-list.json',
    'src/data/supernova-awards.json': 'supernova-awards.json',
};

for (const [filename, schema] of Object.entries(mappings)) {
    await validateGlob(filename, ajv.getSchema(schema));
}

if (errorsFound > 0) {
    console.error(`Found ${errorsFound} errors.`);
    process.exit(1);
}
