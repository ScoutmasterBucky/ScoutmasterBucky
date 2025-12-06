#!/usr/bin/env node

import chalk from "chalk";
import { glob } from "glob";
import got from "got";
import jsonStableStringify from "json-stable-stringify";
import neodoc from "neodoc";
import { parseHTML } from "linkedom";
import path from "path";
import * as prettier from "prettier";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";
import { promises as fsPromises } from "fs";

let errorsDetected = false;

const downloadables = [
    {
        key: 'counselor-info',
        desc: 'Counselor information pages for merit badges',
        fn: downloadCounselorInformation
    },
    {
        key: "merit-badges",
        desc: "Scouts BSA merit badges",
        fn: downloadMeritBadges
    },
    {
        key: "other-awards",
        desc: "One-off awards",
        fn: downloadOtherAwards
    },
    {
        key: "scout-ranks",
        desc: "Scout ranks",
        fn: downloadScoutRanks
    },
    {
        key: "test-labs",
        desc: "Test Lab",
        fn: downloadTestLab
    },
];

async function readJson(fn) {
    const content = await fsPromises.readFile(fn);

    return JSON.parse(content.toString());
}

async function writeJson(fn, data) {
    await fsPromises.writeFile(
        fn,
        `${jsonStableStringify(data, { space: 4 })}\n`
    );
}

async function serialPromises(array, callback) {
    const result = [];

    for (const item of array) {
        result.push(await callback(item));
    }

    return result;
}

function heading(msg) {
    console.log(chalk.inverse(`--- ${msg} ---`));
}

function subheading(msg) {
    console.log(chalk.underline(msg));
}

function debug(msg) {
    console.log(chalk.dim(msg));
}

function safeName(name) {
    return name
        .toLowerCase()
        .replace(/[!,]/g, " ") // "signs, signals, and codes"  "1-2-3 go!"
        .replace(/&/g, " and ") // "fish & wildlife management"
        .replace(/^reptile and amphibian$/, "reptile-and-amphibian-study")
        .trim()
        .replace(/ +/g, "-");
}

// Mitigate multiple HTML fetches for the same page
let lastUrl = '';
let lastRequestUrl = '';
let lastBody = '';

async function getHtmlDom(url) {
    if (lastUrl !== url) {
        lastUrl = url;
        const response = await got(url);
        lastRequestUrl = response.request.requestUrl;
        lastBody = response.body;
    }

    const dom = parseHTML(lastBody);
    dom.requestUrl = lastRequestUrl;

    return dom;
}

async function domQuery(dom, selector, callback) {
    const result = [];

    for (const node of dom.window.document.querySelectorAll(selector)) {
        result.push(node);
    }

    if (callback) {
        return serialPromises(result, (item) => callback(item, dom));
    }

    return result;
}

async function getPdfText(body) {
    function tokensToText(textTokens) {
        return textTokens.items
            .map((token) => {
                if (!token.width && !token.height) {
                    return "\n";
                }

                const eol = token.hasEOL ? "\n" : "";

                return `${token.str}${eol}`;
            })
            .join("");
    }

    async function getPage(page) {
        if (page > pdf.numPages) {
            return result;
        }

        const pageData = await pdf.getPage(page);
        const textTokens = await pageData.getTextContent();
        const text = tokensToText(textTokens);
        result.push(text);

        return getPage(page + 1);
    }

    const pdf = await getDocument({
        data: new Uint8Array(body),
        verbosity: 0
    }).promise;
    const result = [];
    const textArray = await getPage(1);
    return textArray.join("\n\n\n");
}

async function saveBinaryFile(url, destPath) {
    async function writeToFile(response) {
        await fsPromises.writeFile(destPath, response.body);
        await fsPromises.writeFile(
            `${destPath}.json`,
            JSON.stringify({ headers: response.headers }, null, 4)
        );

        if (destPath.match(/\.pdf$/)) {
            // Also convert PDF to text for easier detection of what changed
            const text = await getPdfText(response.body);
            await fsPromises.writeFile(
                destPath.replace(/\.pdf$/, ".txt"),
                text
            );
        }
    }

    // First, check if we already have the most recent version
    // Careful with the comparison because one URL can be used for multiple
    // destinations - e.g. the Music and Bugling merit badge pamphlet is
    // combined.
    const urlString = `${url}`;
    let previousInfo = null;

    try {
        previousInfo = await readJson(`${destPath}.json`);
    } catch (_ignore) {}

    if (!previousInfo) {
        // Not cached
        try {
            const response = await got(url, {
                responseType: "buffer",
            });
            downloadUrlInfo.push({
                url: urlString,
                destination: destPath,
                headers: response.headers,
            });
            await writeToFile(response);

            return;
        } catch (err) {
            errorsDetected = true;
            console.error(chalk.red(`Error downloading ${url}: ${err.message}`));
            return;
        }
    }

    const checkHeaders = {};

    if (previousInfo.headers?.etag) {
        checkHeaders["if-none-match"] = previousInfo.headers?.etag;
    }

    if (previousInfo.headers?.["last-modified"]) {
        checkHeaders["if-modified-since"] =
            previousInfo.headers?.["last-modified"];
    }

    try {
        const response = await got(url, {
            headers: checkHeaders,
            responseType: "buffer",
        });

        if (response.statusCode === 304) {
            // Cached and still valid
            return;
        }

        // Updated
        previousInfo.headers = response.headers;
        await writeToFile(response);
    } catch (err) {
        errorsDetected = true;
        console.error(chalk.red(`Error downloading ${url}: ${err.message}`));
    }
}

async function saveHtml(url, destHtml, selector) {
    selector = selector || "html";
    const dom = await getHtmlDom(url);
    const result = await domQuery(dom, selector || "html");

    if (result.length !== 1) {
        throw new Error(
            `Expected exactly one result instead of ${result.length} for selector: ${selector}`
        );
    }

    const content = result[0].innerHTML.replace(/\r\n?/g, "\n");
    const pretty = await prettier.format(content, { parser: "html" });
    await fsPromises.writeFile(destHtml, pretty);
    return dom;
}

function resolveUrl(link, dom) {
    return new URL(link.getAttribute("href"), dom.requestUrl);
}

async function downloadCounselorInformation(updated) {
    heading("Counselor Information");
    const indexUrl = 'https://www.scouting.org/skills/merit-badges/counselor-information/';
    await saveHtml(indexUrl, 'src/data/counselor-information.html.orig', '[data-id="7627899f"]');
    await downloadList(updated, "counselor-information", [
        {
            key: 'artificial-intelligence-digital-resources',
            url: indexUrl,
            dest: 'download/artificial-intelligence-digital-resources.pdf',
            selector: '[data-id="3ae2e3b"] a',
        },
        {
            key: 'artificial-intelligence-counselor-guidelines',
            url: indexUrl,
            dest: 'download/artificial-intelligence-counselor-guidelines.pdf',
            selector: '[data-id="2c8922a"] a',
        },
        {
            key: 'aviation-camp-director-guide',
            url: indexUrl,
            dest: 'download/aviation-camp-director-guide.pdf',
            selector: '[data-id="f7e0df5"] a',
        },
        {
            key: 'aviation-counselor-presentation',
            url: indexUrl,
            dest: 'download/aviation-counselor-presentation.pptx',
            selector: '[data-id="1e9d65b"] a',
        },
        {
            key: 'aviation-event-coordinator-guide',
            url: indexUrl,
            dest: 'download/aviation-event-coordinator-guide.pdf',
            selector: '[data-id="dc54b09"] a',
        },
        {
            key: "citizenship-in-society-counselor-guide",
            url: indexUrl,
            dest: "download/citizenship-in-society-counselor-guide.pdf",
            selector: '[data-id="09c2081"] a',
        },
        {
            key: 'environmental-science-counselor-guidelines',
            url: indexUrl,
            dest: 'download/environmental-science-counselor-guidelines.pdf',
            selector: '[data-id="cffd4cf"] a',
        },
        {
            key: 'environmental-science-resources',
            url: indexUrl,
            dest: 'download/environmental-science-resources.pdf',
            selector: '[data-id="d6e33b5"] a',
        },
    ]);
}

async function downloadMeritBadges(updated, args) {
    async function fetchMeritBadge(link, indexDom) {
        const mbUrl = resolveUrl(link, indexDom);
        const badgeName = safeName(link.innerText);

        if (args["--filter"] && !badgeName.match(new RegExp(args["--filter"]))) {
            return;
        }

        // Load the merit badge page
        console.log(`[Requirements] ${badgeName}: ${mbUrl}`);
        const dest = `src/data/merit-badges/${badgeName}/${badgeName}.html.orig`;

        // .mb-requirement-container works for most merit badges, but
        // "small-boat-sailing" is slightly different. Possibly others.
        const pageDom = await saveHtml(mbUrl, dest, ':has(> .mb-requirement-container)');

        // Download the pamphlet
        await domQuery(
            pageDom,
            '.mb-scoutshop-pamphlet a[href*=".pdf"]',
            async (link, indexDom) => {
                const pamphletUrl = resolveUrl(link, indexDom);
                console.log(`[Pamphlet] ${badgeName}: ${pamphletUrl}`);
                const pamphletDest = `download/${badgeName}-pamphlet.pdf`;
                await saveBinaryFile(pamphletUrl, pamphletDest);
            }
        );
        updated[badgeName] = Date.now();
    }

    heading("Merit Badges");

    if (args["--filter"]) {
        console.log(chalk.yellow('NOT REMOVING OLD FILES - Merit badges are being filtered'));
    } else {
        debug("Cleaning old files");
        const files = await glob("src/data/merit-badges/*/*.html.orig");
        await serialPromises(files, async (file) => {
            const parts = file.split("/");

            if (`${parts[3]}.html.orig` === parts[4]) {
                await fsPromises.unlink(file);
            }
        });
    }

    subheading(`Fetching merit badge index`);
    const indexUrl = "https://www.scouting.org/skills/merit-badges/all/";
    const indexDom = await getHtmlDom(indexUrl);
    await domQuery(
        indexDom,
        ".mb-card .mb-title .mb-card-title a",
        fetchMeritBadge
    );
}

async function downloadList(updated, updatedPrefix, list) {
    await serialPromises(list, async (item) => {
        if (item.dest.match(".html.orig")) {
            console.log(`${item.key}: ${item.url}`);
            updated[item.key] = Date.now();
            await saveHtml(item.url, item.dest, item.selector);

            return;
        }

        const dom = await getHtmlDom(item.url);
        const links = await domQuery(dom, item.selector);

        if (links.length !== 1) {
            console.log(links.map((link) => link.outerHTML));
            throw new Error(
                `Expected 1 link and found ${links.length}: ${item.url} ${item.selector}`
            );
        }

        const url = resolveUrl(links[0], dom);
        console.log(`${item.key}: ${url}`);
        updated[item.key] = Date.now();
        await saveBinaryFile(url, item.dest);
    });
}

async function downloadOtherAwards(updated) {
    heading("Other Awards");
    await downloadList(updated, "other-awards", [
        {
            key: "50-miler",
            url: "https://www.scouting.org/awards/awards-central/50-miler/",
            dest: "download/50-miler.pdf",
            selector: "a[href*=pdf]"
        },
        {
            key: "aquatics-guide",
            url: "https://www.scouting.org/awards/awards-central/boardsailing/",
            dest: "download/aquatics-guide.pdf",
            selector: "a[href*=pdf]"
        },
        {
            key: "conservation-good-turn-award",
            url: "https://www.scouting.org/outdoor-programs/conservation-and-environment/conservation-good-turn/",
            dest: "src/data/other-awards/conservation-good-turn-award/conservation-good-turn-award.html.orig",
            selector: '[data-id="bf81f70"]'
        },
        {
            key: "complete-angler",
            url: "https://www.scouting.org/awards/awards-central/",
            dest: "download/complete-angler.pdf",
            selector: "a[href*=Angler]"
        },
        {
            key: "totin-chip",
            url: "https://www.scouting.org/awards/awards-central/totin-chip/",
            dest: "src/data/other-awards/totin-chip/totin-chip.html.orig",
            selector: '[data-id="7627899f"]'
        }
    ]);
}

async function downloadScoutRanks(updated) {
    const url =
        "https://www.scouting.org/programs/scouts-bsa/advancement-and-awards/";
    heading("Scout Ranks");
    await downloadList(updated, "scout-ranks", [
        {
            key: "scout",
            url,
            dest: "download/scout.pdf",
            selector: 'a[href*=".pdf"]:contains("Scout Rank Requirements")'
        },
        {
            key: "tenderfoot",
            url,
            dest: "download/tenderfoot.pdf",
            selector: 'a[href*=".pdf"]:contains("Tenderfoot Rank Requirements")'
        },
        {
            key: "second-class",
            url,
            dest: "download/second-class.pdf",
            selector:
                'a[href*=".pdf"]:contains("Second Class Rank Requirements")'
        },
        {
            key: "first-class",
            url,
            dest: "download/first-class.pdf",
            selector:
                'a[href*=".pdf"]:contains("First Class Rank Requirements")'
        },
        {
            key: "star",
            url,
            dest: "download/star.pdf",
            selector: 'a[href*=".pdf"]:contains("Star Rank Requirements")'
        },
        {
            key: "life",
            url,
            dest: "download/life.pdf",
            selector: 'a[href*=".pdf"]:contains("Life Rank Requirements")'
        },
        {
            key: "eagle",
            url,
            dest: "download/eagle.pdf",
            selector: 'a[href*=".pdf"]:contains("Eagle Rank Requirements")'
        },
        {
            key: "eagle-palms",
            url,
            dest: "download/eagle-palms.pdf",
            selector: 'a[href*=".pdf"]:contains("Eagle Palms")'
        },
        {
            key: "alternative-requirements",
            url,
            dest: "download/alternative-requirements.pdf",
            selector:
                'a[href*=".pdf"]:contains("Ranks Alternative Requirements")'
        },
        {
            key: "eagle-alternative-requirements",
            url,
            dest: "download/eagle-alternative-requirements.pdf",
            selector:
                'a[href*=".pdf"]:contains("Eagle Scout Rank Alternative Requirements")'
        }
    ]);
}

async function downloadTestLab(updated, args) {
    async function fetchTestLab(link, indexDom) {
        const url = resolveUrl(link, indexDom);
        const name = safeName(link.innerText);
        console.log(`[Requirements] ${name}: ${url}`);
        const dest = `src/data/test-labs/${name}/${name}.html.orig`;
        const pageDom = await saveHtml(url, dest, '.e-con-inner');
        updated[name] = Date.now();
    }

    heading("Test Lab");

    subheading(`Fetching index`);
    const indexUrl = "https://www.scouting.org/skills/merit-badges/test-lab/";
    await downloadList(updated, "test-labs", [
        {
            key: "test-labs",
            url: indexUrl,
            dest: "src/data/test-labs/test-lab.html.orig",
            selector: '[data-id="3b0c127"]'
        },
    ]);

    const indexDom = await getHtmlDom(indexUrl);
    await domQuery(
        indexDom,
        '[data-id="8f1ed05"] a',
        fetchTestLab
    );
}

function help() {
    let result = `Usage:
    download-updates [OPTIONS] TARGET...

Options:

    --help            Show this help message
    --filter=REGEXP   Filter the list of merit badges to match the expression.
                      Only works with merit badges.

Target:

    all               Downloads everything`;

    for (const item of downloadables) {
        const line =
            `\n    ${item.key}                   `.substr(0, 23) + item.desc;
        result += line;
    }

    return result;
}

const args = neodoc.run(help(), {
    laxPlacement: true
});

const scriptDir = path.dirname(new URL(import.meta.url).pathname);
process.chdir(scriptDir);

let errors = false;

for (const target of args.TARGET) {
    let found = false;

    for (const item of downloadables) {
        if (item.key === target) {
            found = true;
        }
    }

    if (target === "all") {
        found = true;
    }

    if (!found) {
        console.error("Unable to find target:", target);
        errors = true;
    }
}

if (!errors) {
    const updated = await readJson("src/data/updated.json");
    await serialPromises(downloadables, (item) => {
        if (args.TARGET.includes(item.key) || args.TARGET.includes("all")) {
            if (!updated[item.key]) {
                updated[item.key] = {};
            }

            return item.fn(updated[item.key], args);
        }
    });
    await writeJson("src/data/updated.json", updated);
}

if (errorsDetected) {
    console.error(chalk.red("Errors were detected during processing."));
    process.exit(1);
}
