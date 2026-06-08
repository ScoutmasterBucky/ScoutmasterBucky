#!/usr/bin/env bun

import { readFile, writeFile } from 'fs/promises';
import { parseArgs } from 'node:util';
import { parseHTML } from 'linkedom';
import { join, dirname } from 'path';
import { dump } from 'js-yaml';

const textReplacements: { match: RegExp; updated: string }[] = [
    {
        match: / Stamp and coin collecting are excluded from /,
        updated: ' <a href="/merit-badges/stamp-collecting/">Stamp</a> and <a href="/merit-badges/coin-collecting/">coin collecting</a> are excluded from ',
    },
    {
        match: /Totin' Chip/i,
        updated: '<a href="/other-awards/totin-chip/">Totin\' Chip</a>',
    },
    {
        match: /(?:<(?:i|em)>?)Canoeing(?:<\/(?:i|em)>)? merit badge/,
        updated:
            '<a href="/merit-badges/canoeing/"><i>Canoeing</i> merit badge</a>',
    },
    {
        // Emergency Preparedness has "First Aid Merit Badge" as a section title.
        match: /(?:<(?:i|em)>)?First Aid(?:<\/(?:i|em)>)? merit badge/,
        updated:
            '<a href="/merit-badges/first-aid/"><i>First Aid</i> merit badge</a>',
    },
    {
        match: /(?:<(?:i|em)>)?Kayaking(?:<\/(?:i|em)>)? merit badge/,
        updated:
            '<a href="/merit-badges/kayaking/"><i>Kayaking</i> merit badge</a>',
    },
    {
        match: /(?:<(?:i|em)>)?Painting(?:<\/(?:i|em)>)? merit badge/,
        updated:
            '<a href="/merit-badges/painting/"><i>Painting</i> merit badge</a>',
    },
    {
        match: /(?:<(?:i|em)>)?Space Exploration(?:<\/(?:i|em)>)? merit badge/,
        updated:
            '<a href="/merit-badges/space-exploration/"><i>Space Exploration</i> merit badge</a>',
    },
    {
        match: /(?:<(?:i|em)>)?Swimming(?:<\/(?:i|em)>)? merit badge/,
        updated:
            '<a href="/merit-badges/swimming/"><i>Swimming</i> merit badge</a>',
    },
    {
        match: / Personal Safety Awareness "Digital Safety" video/,
        updated:
            ' <a href="https://www.scouting.org/training/youth-protection/scouts-bsa/">Personal Safety Awareness "Digital Safety" video</a>',
    },
    {
        match: / www.geocaching.com/i,
        updated:
            ' <a href="https://www.geocaching.com/">www.geocaching.com</a>',
    },
];

function help() {
    console.log(`
Usage: html-to-requirements-yaml [options] <input-file>

Options:
  -h, --help    Show this help message and exit
  -w, --write   Write the output to requirements.yaml instead of stdout
`);
}

main();

async function main() {
    const { values, positionals } = parseArgs({
        options: {
            help: {
                type: 'boolean',
                short: 'h',
                default: false,
            },
            write: {
                type: 'boolean',
                short: 'w',
                default: false,
            },
        },
        allowPositionals: true,
    });

    if (values.help) {
        help();
        process.exit(0);
    }

    if (positionals.length !== 1) {
        console.error('Error: Exactly one input file must be specified.');
        process.exit(1);
    }

    for (const filePath of positionals) {
        const yaml = await processHtmlFile(positionals[0]);

        if (values.write) {
            await writeFile(
                join(dirname(filePath), 'requirements.yaml'),
                yaml,
                'utf-8'
            );
        } else {
            console.log(yaml);
        }
    }
}

class ProcessingFile {
    comments: string[] = [];

    constructor(public filePath: string) {}

    addAutoComment(comment: string) {
        this.comments.push(`# AUTO: ${comment}`);
    }

    getComments(): string {
        return this.comments.map(c => `${c}\n`).join('');
    }

    warn(message: string) {
        message = message.replace('\n', ' ');
        console.warn(`${this.filePath}: ${message}`);
        this.addAutoComment(`WARNING: ${message}`);
    }
}

async function processHtmlFile(filePath: string) {
    const processingFile = new ProcessingFile(filePath);
    const result: any[] = [];
    await readFile(join(dirname(filePath), 'requirements.yaml'), 'utf-8')
        .then(oldText => {
            const lines = oldText.split('\n');

            while (
                lines[0]?.startsWith('#') &&
                !lines[0].startsWith('# AUTO:')
            ) {
                processingFile.comments.push(lines.shift()!);
            }
        })
        .catch(() => {});

    const htmlContent = await readFile(filePath, 'utf-8');
    const { document } = parseHTML(htmlContent);

    for (const child of document.documentElement.children) {
        // Depth of 1 indicates the inside of the array
        processRequirement(processingFile, result, 1, child);
    }

    let yaml = processingFile.getComments();

    yaml += dump(result, {
        indent: 4,
        noRefs: true,
    });

    return yaml;
}

// Top level div.mb-requirement-item
function processRequirement(
    processingFile: ProcessingFile,
    dest: any[],
    depth: number,
    requirement: Element
) {
    if (!requirement.classList.contains('mb-requirement-item')) {
        console.error(requirement.outerHTML);
        throw new Error('Element does not contain "mb-requirement-item" class');
    }

    if (requirement.children.length === 1) {
        const parent = requirement.children[0];

        // There's only one element, so it is a simpler requirement.
        processSingleRequirement(processingFile, dest, depth, parent);
    } else if (
        requirement.children[0].classList.contains('mb-requirement-parent') &&
        requirement.children[1].tagName === 'UL'
    ) {
        // A requirement with sub-requirements.
        const resultParent = processSingleRequirement(
            processingFile,
            dest,
            depth,
            requirement.children[0]
        );
        const parentId = getId('mb-requirement-id-', requirement.children[0]);
        const requirementIdToDest = new Map<string, any>();
        const requirementIdToDepth = new Map<string, number>();
        requirementIdToDest.set(parentId, resultParent);
        requirementIdToDepth.set(parentId, depth);

        for (const li of requirement.children[1].children) {
            if (li.tagName === 'LI') {
                const parentId = getId('mb-parent-', li);
                const dest = requirementIdToDest.get(parentId);
                const destDepth = requirementIdToDepth.get(parentId)!;

                if (!dest) {
                    throw new Error(
                        `Could not find parent requirement for ID ${parentId}`
                    );
                }

                if (!dest.children) {
                    dest.children = [];
                }

                const child = processSingleRequirement(
                    processingFile,
                    dest.children,
                    destDepth + 2,
                    li
                );
                const childId = getId('mb-requirement-id-', li);
                requirementIdToDest.set(childId, child);
                requirementIdToDepth.set(childId, destDepth + 2);
            } else {
                console.error(li.outerHTML);
                throw new Error('Expected LI element in UL');
            }
        }
    } else {
        console.error(requirement.outerHTML);
        throw new Error('Element does not match expected structure');
    }
}

// Process an element for a single requirement's text.
//
// Can work with HTML elements that have a requirement number, like this:
//
// <span class="mb-requirement-listnumber"> 1. </span> Do the following
//
// Can work with HTML elements that have a requirement letter, like this:
//
// (a) Do ONE of the following:
function processSingleRequirement(
    processingFile: ProcessingFile,
    dest: any[],
    depth: number,
    parent: Element
) {
    let html = parent.innerHTML.trim();
    let resources: any[] = [];
    let requirement;
    const num = parent.querySelector('span.mb-requirement-listnumber');

    if (num) {
        if (num.textContent.trim() !== '') {
            requirement = cleanRequirement(num.textContent);
        }

        html = html.replace(num.outerHTML, '').trim();
    }

    const matchNumber =
        html.match(/^\(([a-z0-9]{1,2})\)\s+/im) ||
        html.match(/^([a-z0-9]{1,2})\.\s+/im);

    if (matchNumber) {
        if (requirement) {
            console.error(parent.outerHTML);
            throw new Error(
                'Requirement number already exists, but found another numbered requirement'
            );
        }

        requirement = cleanRequirement(matchNumber[1]);
        html = html.replace(matchNumber[0], '').trim();
    }

    const matchResources = html.match(/\s*(<i>)?\s*Resources?:\s*(<\/i>)?\s*/m);

    if (matchResources && !matchResources[1]) {
        processingFile.warn(
            `Resources section is not wrapped in italics near "${html.substring(0, 50)}..."`
        );
    }

    if (matchResources) {
        const [before, after] = html.split(matchResources[0]);
        html = before.trim();
        resources = [];
        processResources(processingFile, resources, depth + 2, after);
    }

    const text = rewrap(linkify(manageNotes(unwrap(html))), depth + 1);

    if (!text) {
        return null;
    }

    const result: any = {
        requirement,
        text: rewrap(linkify(manageNotes(unwrap(html))), depth + 1),
    };

    if (resources.length) {
        result.resources = resources;
    }

    dest.push(result);

    return result;
}

function processResources(
    processingFile: ProcessingFile,
    dest: any[],
    depth: number,
    html: string
) {
    const { document } = parseHTML(html);
    for (const link of document.querySelectorAll('a')) {
        // Avoid .textContent because this is dropped in as HTML
        let text = link.innerHTML
            .replace(/\n/g, ' ')
            .replace(/  +/, ' ')
            .trim();
        const match = text.match(
            /\(\s*(pdf|photo|picture|playlist|podcast|video|web|webpage|website|website\s*\/\s*videos?|website with videos)\s*\)/i
        );
        let type = '?';

        if (match) {
            text = text.replace(match[0], '').trim();
            type = match[0].toLowerCase().replace(/[()]/g, '');
            const typeClean = type.trim().toLowerCase();

            if (type !== typeClean) {
                processingFile.warn(
                    `Found resource type with extra whitespace or capitalization near "${text.substring(0, 50)}...". This should be cleaned up from "${type}" to "${typeClean}".`
                );
            }

            type = typeClean;
        }

        if (type === 'picture') {
            processingFile.warn(
                `Found "picture" resource type near "${text.substring(0, 50)}...". This should be "image".`
            );
            type = 'image';
        } else if (type === 'webpage' || type === 'web') {
            processingFile.warn(
                `Found "${type}" resource type near "${text.substring(0, 50)}...". This should be "website".`
            );
            type = 'website';
        } else if (type.match(/^website\s\/\svideo/)) {
            processingFile.warn(
                `Found "${type}" resource type near "${text.substring(0, 50)}...". This should be "website with video".`
            );
            type = 'website with video';
        } else if (type.match(/^website\s*\/\s*videos?$/)) {
            processingFile.warn(
                `Found "${type}" resource type near "${text.substring(0, 50)}...". This should be "website with videos".`
            );
            type = 'website with videos';
        } else if (type === 'photo') {
            processingFile.warn(
                `Found "photo" resource type near "${text.substring(0, 50)}...". This should be "image".`
            );
            type = 'image';
        }

        text = rewrap(unwrap(text), depth + 1);
        let href = link.getAttribute('href') || '?';
        href = href
            .replace(/\?si=.*$/, '')
            .replace(/\?utm_source=.*/, '')
            .replace(/\?feature=share.*/, '')
            .replace(/\?share=.*/, '')
            .replace(/\?srsltid=.*/, '')
            .replace(/\?_gl=.*/, '')
            .trim();

        if (href.endsWith('%20')) {
            processingFile.warn(
                `Found URL ending with "%20" near "${text.substring(0, 50)}...". This should be cleaned up.`
            );
            href = href.replace(/(%20)+$/, '');
        }

        if (href.match(/\.pdf$/i) && type !== 'pdf') {
            processingFile.warn(
                `Found URL ending with ".pdf" near "${text.substring(0, 50)}..." with resource type "${type}". This should be "pdf".`
            );
            type = 'pdf';
        }

        if (href.match(/\.jpg$/i) && type !== 'image') {
            processingFile.warn(
                `Found URL ending with ".jpg" near "${text.substring(0, 50)}..." with resource type "${type}". This should be "image".`
            );
            type = 'image';
        }

        if (href.match(/\.docx$/i) && type !== 'docx') {
            processingFile.warn(
                `Found URL ending with ".docx" near "${text.substring(0, 50)}..." with resource type "${type}". This should be "docx".`
            );
            type = 'docx';
        }

        if (type === '?') {
            processingFile.warn(
                `Could not determine resource type for link with text "${text.substring(0, 50)}..." and URL "${href}". Please check this manually.`
            );
        }

        const resource = {
            href,
            text,
            type,
        };
        dest.push(resource);
    }
}

function unwrap(html: string): string {
    return (
        html
            // This is pure HTML - remove newlines and swap with space
            .replace(/\n/g, ' ')

            // Convert some HTML tags to text
            .replace(/<br>/g, '\n')

            // Clean up the text
            .replace(/  +/g, ' ')
            .replace(/^\s+/g, '')
            .replace(/\s+$/g, '')

            // Fix placement of some tags
            .replace(/<(b|strong|i|em)>(\s+)/g, '$2<$1>')
            .replace(/(\s+)<\/(b|strong|i|em)>/g, '</$2>$1')

            // Clean up the text again
            .replace(/  +/g, ' ')
            .replace(/^\s+/, '')
            .replace(/\s+$/, '')
            .replace(/(\s*\n)+\s*/g, '\n')
    );
}

function linkify(text: string): string {
    for (const { match, updated } of textReplacements) {
        text = text.split(match).join(updated);
    }

    return text;
}

function rewrap(text: string, depth: number): string {
    const lines = text.split('\n');
    const rewrappedLines = lines.map(line => rewrapLine(line, depth));
    return rewrappedLines.join('\n<div class="gap"></div>\n');
}

function rewrapLine(text: string, depth: number): string {
    // Rewrap to (80 - depth * 4) characters
    const maxLineLength = 80 - depth * 4;
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';

    for (const word of words) {
        if (
            (currentLine + ' ' + word).trim().length > maxLineLength &&
            currentLine.trim() !== ''
        ) {
            lines.push(currentLine.trim());
            currentLine = word;
        } else {
            currentLine += ' ' + word;
        }
    }

    if (currentLine.trim() !== '') {
        lines.push(currentLine.trim());
    }

    // Don't pad the string. YAML will do that for us.
    return lines.join('\n');
}

function cleanRequirement(text: string): string | number {
    let result: string | number = text.trim().replace(/\.$/, '');

    if (result.match(/^\d+$/)) {
        result = parseInt(result, 10);
    }

    return result;
}

function getId(prefix: string, element: Element): string {
    for (const cls of element.classList) {
        if (cls.startsWith(prefix)) {
            return cls.replace(prefix, '');
        }
    }

    console.error(element.outerHTML);
    throw new Error(
        `Could not find matching ID in element for prefix ${prefix}`
    );
}

function manageNotes(html: string): string {
    function cleanPat(str: string, pattern: RegExp) {
        return str
            .replace(pattern, '')
            .replace(/  +/g, ' ')
            .replace(/\n\n+/, '\n')
            .trim();
    }

    // Space exploration has "Safety Note:". Most others have "NOTE:" but some have "Note:".
    const pattern = />\s*(Safety\s*)?Note:/i;

    if (!pattern.test(html)) {
        return html;
    }

    // Remove the note about merit badge pamphlets being free.
    let italicsNotes = false;
    return html
        .split('\n')
        .map(line => {
            line = cleanPat(line, /<\/?\s*b\s*>/g);
            line = cleanPat(
                line,
                /Note:.*official merit badge pamphlets are now free.*<\/a>/i
            );
            line = cleanPat(
                line,
                /Note:.*check out the digital resource guide.* your merit badge journey.*/i
            );

            // Shotgun shooting omits "Note" because there are multiple notes. Some
            // merit badges have multiple Note: headings, some don't.
            line = cleanPat(
                line,
                /The official merit badge pamphlets are now free.*<\/a>/i
            );

            if (line.match(/(Safety\s*)?Note:/i)) {
                italicsNotes = true;
                line = line.replace(/(Safety\s*)?Note:/i, '<b>NOTE:</b>');
            }

            if (italicsNotes && line) {
                line = `<i>${line}</i>`;
            }

            return line;
        })
        .filter(line => !!line)
        .join('\n');
}
