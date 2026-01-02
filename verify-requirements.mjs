#!/usr/bin/env/node
import { glob, readFile } from 'node:fs/promises';
import { load } from 'js-yaml';

function verifyRequirements(requirements, file) {
    let last = null;

    for (const req of requirements) {
        if (req.requirement) {
            if (typeof last === 'number') {
                if (req.requirement !== last + 1) {
                    console.error(`Requirements are not sequential in file: ${file}`);
                    console.error(`  Expected requirement ${last + 1}, but found ${req.requirement}`);
                    console.error(``);
                    errors = true;
                    return;
                }
            } else if (typeof last === 'string') {
                if (String.fromCharCode(last.charCodeAt(0) + 1) !== req.requirement) {
                    console.error(`Requirements are not sequential in file: ${file}`);
                    console.error(`  Expected requirement ${String.fromCharCode(last.charCodeAt(0) + 1)}, but found ${req.requirement}`);
                    console.error(``);
                    errors = true;
                    return;
                }
            }

            last = req.requirement;
        }

        if (req.children) {
            verifyRequirements(req.children, file);
        }

        if (req.text) {
            if (req.text.match(/ [*_`]|[*_`]( |$)/)) {
                console.error(`Requirement text contains markdown in file: ${file}`);
                console.error(`  Text: ${req.text}`);
                console.error(``);
                errors = true;
                return;
            }
        }
    }
}

async function verify(file) {
    const contents = await readFile(file, 'utf8');
    try {
        const requirements = load(contents);
        verifyRequirements(requirements, file);
    } catch (_ignore) {
        console.error(`Invalid YAML in file: ${file}`);
        console.error(``);
        errors = true;
    }
}

let errors = false;

for await (const file of glob('src/data/**/requirements.yaml')) {
    await verify(file);
}

if (errors) {
    process.exit(1);
}
