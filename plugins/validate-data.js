const Ajv = require("ajv");
const debug = require("debug")("validateData");
const fs = require("fs");
const path = require("path");
const pluginKit = require("metalsmith-plugin-kit");

// Load schemas to validata data. This is not recursive
const schemaFolder = path.resolve(__dirname, "../schemas");
const schemas = {};

for (fn of fs.readdirSync(schemaFolder)) {
    if (fn.match(/^[^.]/) && fn.match(/\.json$/)) {
        const resolvedFilename = path.resolve(schemaFolder, fn);
        const schema = JSON.parse(fs.readFileSync(resolvedFilename, "utf8"));
        schema.$id = fn;
        schemas[fn] = schema;
    }
}

const ajv = new Ajv({ schemas: Object.values(schemas) });
let objectCache = [];
let requirementsValidator = ajv.getSchema("requirement-list.json");

module.exports = function validateData() {
    return pluginKit.middleware({
        before: function (files) {
            objectCache = [];

            // Just do default metadata once
            validateOrThrow(
                "default-metadata.js",
                files["404.md"].meritBadges,
                ajv.getSchema("merit-badges.json")
            );
            validateOrThrow(
                "default-metadata.js",
                files["404.md"].novaAwards,
                ajv.getSchema("nova-awards.json")
            );
            validateOrThrow(
                "default-metadata.js",
                files["404.md"].supernovaAwards,
                ajv.getSchema("supernova-awards.json")
            );
        },
        each: function (filename, fileObject) {
            if (
                fileObject.data &&
                fileObject.data.requirements &&
                objectCache.indexOf(fileObject.data.requirements) === -1
            ) {
                debug(`Validating data: ${filename}`);
                validateOrThrow(
                    filename,
                    fileObject.data.requirements,
                    requirementsValidator
                );
                augmentRequirements(fileObject.data.requirements, []);
                objectCache.push(fileObject.data.requirements);
            }
        },
        match: "merit-badges/*/index.md|merit-badges/*/workbook/index.md|nova-awards/**/index.md|scout-ranks/*/index.md"
    });
};

function validateOrThrow(dataPath, data, validator) {
    const isValid = validator(data);

    if (!isValid) {
        throw new Error(`Error in data file: ${dataPath}
${showErrors(validator.errors)}`);
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

function augmentRequirements(arr, parents) {
    for (const item of arr) {
        item.parents = parents;

        if (item.children) {
            augmentRequirements(item.children, [...parents, item]);
        }

        if (item.workbook) {
            augmentWorkbook(item.workbook);
        }
    }
}

let idNum = 0;

function augmentWorkbook(arr) {
    for (const item of arr) {
        // Give each a unique ID for wkhtmltopdf picks up the form field
        idNum += 1;
        item.id = `wb_${idNum}`;
    }
}
