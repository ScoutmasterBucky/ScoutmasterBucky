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

const downloadables = [
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

async function getHtmlDom(url) {
    const response = await got(url);
    const dom = parseHTML(response.body);
    dom.requestUrl = response.request.requestUrl;

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

async function savePdfAndText(downloadUrlInfo, url, destPdf) {
    async function writeToFile(response) {
        await fsPromises.writeFile(destPdf, response.body);
        const text = await getPdfText(response.body);
        await fsPromises.writeFile(
            destPdf.replace(/\.pdf$/, ".txt"),
            text
        );
    }

    // First, check if we already have the most recent version
    const urlString = `${url}`;
    let previousInfo = downloadUrlInfo.find((item) => item.url === urlString && item.destination === destPdf);

    if (!previousInfo) {
        // Not cached
        const response = await got(url, {
            responseType: "buffer",
        });
        downloadUrlInfo.push({
            url: urlString,
            destination: destPdf,
            headers: response.headers,
        });
        writeToFile(response);

        return;
    }

    const checkHeaders = {};

    if (previousInfo.headers?.etag) {
        checkHeaders["if-none-match"] = previousInfo.headers?.etag;
    }

    if (previousInfo.headers?.["last-modified"]) {
        checkHeaders["if-modified-since"] =
            previousInfo.headers?.["last-modified"];
    }

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
    writeToFile(response);
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

async function downloadMeritBadges(updated, downloadUrlInfo, args) {
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
                const pamphletDest = `public/merit-badges/${badgeName}/${badgeName}-pamphlet.pdf`;
                await savePdfAndText(downloadUrlInfo, pamphletUrl, pamphletDest);
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
    let indexUrl = "https://www.scouting.org/skills/merit-badges/all/";
    const indexDom = await getHtmlDom(indexUrl);
    await domQuery(
        indexDom,
        ".mb-card .mb-title .mb-card-title a",
        fetchMeritBadge
    );
}

async function downloadList(updated, downloadUrlInfo, updatedPrefix, list) {
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
            throw new Error(
                `Expected 1 link and found ${links.length}: ${item.url} ${item.selector}`
            );
        }

        const url = resolveUrl(links[0], dom);
        console.log(`${item.key}: ${url}`);
        updated[item.key] = Date.now();
        await savePdfAndText(downloadUrlInfo, url, item.dest);
    });
}

async function downloadOtherAwards(updated, downloadUrlInfo) {
    heading("Other Awards");
    await downloadList(updated, downloadUrlInfo, "other-awards", [
        {
            key: "50-miler",
            url: "https://www.scouting.org/awards/awards-central/50-miler/",
            dest: "public/other-awards/50-miler.pdf",
            selector: "a[href*=pdf]"
        },
        {
            key: "aquatics-guide",
            url: "https://www.scouting.org/awards/awards-central/boardsailing/",
            dest: "public/other-awards/aquatics-guide.pdf",
            selector: "a[href*=pdf]"
        },
        {
            key: "conservation-good-turn-award",
            url: "https://www.scouting.org/outdoor-programs/conservation-and-environment/conservation-good-turn/",
            dest: "src/data/other-awards/conservation-good-turn-award.html.orig",
            selector: "[data-id=bf81f70]"
        },
        {
            key: "complete-angler",
            url: "https://www.scouting.org/awards/awards-central/",
            dest: "public/other-awards/complete-angler.pdf",
            selector: "a[href*=Angler]"
        },
        {
            key: "totin-chip",
            url: "https://www.scouting.org/awards/awards-central/totin-chip/",
            dest: "src/data/other-awards/totin-chip.html.orig",
            selector: "[data-id=7627899f]"
        }
    ]);
}

async function downloadScoutRanks(updated, downloadUrlInfo) {
    const url =
        "https://www.scouting.org/programs/scouts-bsa/advancement-and-awards/";
    heading("Scout Ranks");
    await downloadList(updated, downloadUrlInfo, "scout-ranks", [
        {
            key: "scout",
            url,
            dest: "src/data/scout-ranks/scout.pdf",
            selector: 'a[href*=".pdf"]:contains("Scout Rank Requirements")'
        },
        {
            key: "tenderfoot",
            url,
            dest: "src/data/scout-ranks/tenderfoot.pdf",
            selector: 'a[href*=".pdf"]:contains("Tenderfoot Rank Requirements")'
        },
        {
            key: "second-class",
            url,
            dest: "src/data/scout-ranks/second-class.pdf",
            selector:
                'a[href*=".pdf"]:contains("Second Class Rank Requirements")'
        },
        {
            key: "first-class",
            url,
            dest: "src/data/scout-ranks/first-class.pdf",
            selector:
                'a[href*=".pdf"]:contains("First Class Rank Requirements")'
        },
        {
            key: "star",
            url,
            dest: "src/data/scout-ranks/star.pdf",
            selector: 'a[href*=".pdf"]:contains("Star Rank Requirements")'
        },
        {
            key: "life",
            url,
            dest: "src/data/scout-ranks/life.pdf",
            selector: 'a[href*=".pdf"]:contains("Life Rank Requirements")'
        },
        {
            key: "eagle",
            url,
            dest: "src/data/scout-ranks/eagle.pdf",
            selector: 'a[href*=".pdf"]:contains("Eagle Rank Requirements")'
        },
        {
            key: "eagle-palms",
            url,
            dest: "src/data/scout-ranks/eagle-palms.pdf",
            selector: 'a[href*=".pdf"]:contains("Eagle Palms")'
        },
        {
            key: "alternative-requirements",
            url,
            dest: "src/data/scout-ranks/alternative-requirements.pdf",
            selector:
                'a[href*=".pdf"]:contains("Ranks Alternative Requirements")'
        },
        {
            key: "eagle-alternative-requirements",
            url,
            dest: "src/data/scout-ranks/eagle-alternative-requirements.pdf",
            selector:
                'a[href*=".pdf"]:contains("Eagle Scout Rank Alternative Requirements")'
        }
    ]);
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
    const downloadUrlInfo = await readJson("src/data/download-url-info.json");
    await serialPromises(downloadables, (item) => {
        if (args.TARGET.includes(item.key) || args.TARGET.includes("all")) {
            if (!updated[item.key]) {
                updated[item.key] = {};
            }

            return item.fn(updated[item.key], downloadUrlInfo, args);
        }
    });
    await writeJson("src/data/updated.json", updated);
    await writeJson("src/data/download-url-info.json", downloadUrlInfo);
}
