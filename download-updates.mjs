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
        key: "nova-awards",
        desc: "Nova awards for all programs",
        fn: downloadNovaAwards
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
        key: "supernova-awards",
        desc: "Supernova awards for all programs",
        fn: downloadSupernovaAwards
    }
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
        .replace(/[’.]/g, "") // "mendel’s minions" "the dr. louis w. alvarez supernova award"
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

function getPdfText(body) {
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

    return getDocument({
        data: new Uint8Array(body),
        verbosity: 0
    }).promise.then((pdf) => {
        function getPage(page) {
            if (page > pdf.numPages) {
                return result;
            }

            return pdf
                .getPage(page)
                .then((pageData) => pageData.getTextContent())
                .then((textTokens) => tokensToText(textTokens))
                .then((text) => {
                    result.push(text);

                    return getPage(page + 1);
                });
        }

        const result = [];

        return getPage(1).then((textArray) => textArray.join("\n\n\n"));
    });
}

function savePdfAndText(url, destPdf) {
    return got(url, {
        responseType: "buffer"
    }).then((response) => {
        return fsPromises
            .writeFile(destPdf, response.body)
            .then(() => getPdfText(response.body))
            .then((text) => {
                return fsPromises.writeFile(
                    destPdf.replace(/\.pdf$/, ".txt"),
                    text
                );
            });
    });
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
                const pamphletDest = `public/merit-badges/${badgeName}/${badgeName}-pamphlet.pdf`;
                await savePdfAndText(pamphletUrl, pamphletDest);
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

            if (parts[2] === parts[3].replace(/\.(pdf|txt|html)$/, "")) {
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

async function downloadNovaAwards(updated) {
    async function fetchPdf(link, dom, fileBase) {
        const url = resolveUrl(link, dom);
        const name = safeName(link.innerText);
        console.log(`${name}: ${url}`);
        updated[name] = Date.now();
        await savePdfAndText(url, `${fileBase}${name}.pdf`);
    }

    heading("Nova Awards");
    subheading("Cub Scouts Nova Awards");
    const cubDom = await getHtmlDom(
        "https://www.scouting.org/stem-nova-awards/awards/cub-scout/"
    );
    await domQuery(cubDom, '[data-id="73543ea7"] a[href*=".pdf"]', (link) =>
        fetchPdf(link, cubDom, "src/data/nova-lab/cub-scouts/")
    );

    subheading("Scouts BSA Nova Awards");
    const scoutDom = await getHtmlDom(
        "https://www.scouting.org/stem-nova-awards/awards/scouts-bsa/"
    );
    await domQuery(scoutDom, '[data-id="9786783"] a[href*="pdf"]', (link) =>
        fetchPdf(link, scoutDom, "src/data/nova-lab/scouts-bsa/")
    );

    subheading("Venturing and Sea Scouts Nova Awards");
    const ventureDom = await getHtmlDom(
        "https://www.scouting.org/stem-nova-awards/awards/venturer/"
    );
    await domQuery(ventureDom, '[data-id="259c931"] a[href*="pdf"]', (link) =>
        fetchPdf(link, ventureDom, "src/data/nova-lab/venturing-and-sea-scouts/")
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
            throw new Error(
                `Expected 1 link and found ${links.length}: ${item.url} ${item.selector}`
            );
        }

        const url = resolveUrl(links[0], dom);
        console.log(`${item.key}: ${url}`);
        updated[item.key] = Date.now();
        await savePdfAndText(url, item.dest);
    });
}

async function downloadOtherAwards(updated) {
    heading("Other Awards");
    await downloadList(updated, "other-awards", [
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
        // 404 on 2025-08-08
        {
            key: "keep-america-beautiful-hometown-usa",
            url: "https://www.scouting.org/awards/awards-central/keep-america-beautiful-hometown-usa-award/",
            dest: "src/data/other-awards/keep-america-beautiful-hometown-usa.html.orig",
            selector: "[data-id=eb59c62]"
        },
        {
            key: "totin-chip",
            url: "https://www.scouting.org/awards/awards-central/totin-chip/",
            dest: "src/data/other-awards/totin-chip.html.orig",
            selector: "[data-id=7627899f]"
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

async function downloadSupernovaAwards(updated) {
    async function downloadProgramAwards(program, url, selector, mapping) {
        subheading(program);
        const dom = await getHtmlDom(url);
        await domQuery(dom, selector, async (link) => {
            const nameBeforeMapping = safeName(link.innerText);
            const name = mapping[nameBeforeMapping];
            const pdfUrl = resolveUrl(link, dom);

            if (!name) {
                throw new Error(
                    `Unable to map Supernova name: ${nameBeforeMapping}`
                );
            }

            console.log(`${name}: ${pdfUrl}`);
            updated[name] = Date.now();

            await savePdfAndText(
                pdfUrl,
                `src/data/nova-lab/supernova/${name}.pdf`
            );
        });
    }

    heading("Supernova Awards");
    await downloadProgramAwards(
        "Cub Scouts",
        "https://www.scouting.org/stem-nova-awards/awards/cub-scout/",
        '[data-id="2b32d13"] a[href*=".pdf"]',
        {
            "the-dr-louis-w-alvarez-supernova-award": "dr-luis-walter-alvarez",
            "the-dr-charles-townes-supernova-award": "dr-charles-h-townes"
        }
    );
    await downloadProgramAwards(
        "Scouts BSA",
        "https://www.scouting.org/stem-nova-awards/awards/scouts-bsa/",
        '[data-id="699347f"] a[href*=".pdf"]:not([href*="Supernova-Application"]):not([href*="flowchart"]):not([href*="Flow-Chart"])',
        {
            "dr-bernard-harris-requirements": "dr-bernard-harris",
            "thomas-edison-requirements": "thomas-alva-edison",
            "dr-albert-einstein-requirements": "dr-albert-einstein" // Same as Venturing
        }
    );
    await downloadProgramAwards(
        "Venturing and Sea Scouting",
        "https://www.scouting.org/stem-nova-awards/awards/venturer/",
        '[data-id="97f67b6"] a[href*=".pdf"]:not([href*="Supernova-Application"]):not([href*="flowchart"]):not([href*="Flow-Chart"])',
        {
            "dr-sally-ride-requirements": "dr-sally-ride",
            "wright-brothers-requirements": "wright-brothers",
            "dr-albert-einstein-requirements": "dr-albert-einstein" // Same as Scouts BSA
        }
    );
    subheading("Additional Materials");
    await downloadList(updated, "supernova", [
        {
            key: "activity-topics",
            url: "https://www.scouting.org/stem-nova-awards/awards/venturer-supernova-topics/",
            dest: "src/data/nova-lab/activity-topics/activity-topics.html.orig",
            selector: '[data-id="74ca43fb"]'
        },
        {
            key: "award-application",
            url: "https://www.scouting.org/stem-nova-awards/awards/cub-scout/",
            dest: "public/nova-lab/supernova/award-application.pdf",
            selector: '[data-id="d291cac"] a[href*=".pdf"]'
        },
        {
            key: "dr-albert-einstein-supernova-application",
            url: "https://www.scouting.org/stem-nova-awards/awards/scouts-bsa/",
            dest: "public/nova-lab/supernova/dr-albert-einstein-supernova-application.pdf",
            selector: '[data-id="b009a02"] a[href*="Supernova-Application"]'
        },
        {
            key: "dr-albert-einstein-supernova-flowchart",
            url: "https://www.scouting.org/stem-nova-awards/awards/scouts-bsa/",
            dest: "public/nova-lab/supernova/dr-albert-einstein-supernova-flowchart.pdf",
            selector: '[data-id="b009a02"] a[href*="Process-Flow-Chart"]'
        },
        {
            key: "dr-albert-einstein-supernova-guide",
            url: "https://www.scouting.org/stem-nova-awards/awards/scouts-bsa/",
            dest: "public/nova-lab/supernova/dr-albert-einstein-supernova-guide.pdf",
            selector: '[data-id="b009a02"] a[href*="Einstein-Guide"]'
        },
        {
            key: "exploration-requirements",
            url: "https://www.scouting.org/stem-nova-awards/awards/venturer/",
            dest: "src/data/nova-lab/exploration-requirements.pdf",
            selector: '[data-id="9096690"] a[href*=".pdf"]'
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
