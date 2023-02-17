#!/usr/bin/env node

import chalk from "chalk";
import glob from "glob";
import got from "got";
import jsonStableStringify from "json-stable-stringify";
import neodoc from "neodoc";
import { parseHTML } from "linkedom";
import path from "path";
import pdfjslib from "pdfjs-dist/build/pdf.js";
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

function readJson(fn) {
    return fsPromises.readFile(fn).then((content) => {
        return JSON.parse(content.toString());
    });
}

function writeJson(fn, data) {
    return fsPromises.writeFile(fn, `${jsonStableStringify(data, {space: 4})}\n`);
}

function globPromise(spec) {
    return new Promise((resolve, reject) => {
        glob(spec, (err, files) => {
            if (err) {
                reject(err);
            } else {
                resolve(files);
            }
        });
    });
}

function serialPromises(array, callback) {
    return array.reduce((promiseChain, next) => {
        return promiseChain.then((resultArray) => {
            return Promise.resolve(callback(next)).then((nextResult) => {
                resultArray.push(nextResult);

                return resultArray;
            });
        });
    }, Promise.resolve([]));
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

function getHtmlDom(url) {
    return got(url).then((response) => {
        const dom = parseHTML(response.body);
        dom.requestUrl = response.request.requestUrl;

        return dom;
    });
}

function domQuery(dom, selector, callback) {
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

    return pdfjslib
        .getDocument({
            data: body,
            verbosity: 0
        })
        .promise.then((pdf) => {
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

function saveHtml(url, destHtml, selector) {
    selector = selector || "html";

    return getHtmlDom(url)
        .then((dom) => {
            const result = domQuery(dom, selector || "html").map((n) => {
                return n.innerHTML;
            });

            if (result.length !== 1) {
                throw new Error(
                    `Expected exactly one result instead of ${result.length} for selector: ${selector}`
                );
            }

            return result[0].replace(/\r\n?/g, "\n");
        })
        .then((result) => {
            return fsPromises.writeFile(destHtml, result);
        });
}

function resolveUrl(link, dom) {
    return new URL(link.getAttribute("href"), dom.requestUrl);
}

function downloadMeritBadges(updated) {
    function fetchMeritBadge(link, dom) {
        const url = resolveUrl(link, dom);
        const badgeName = safeName(link.innerText);

        if (url.toString().match(/\.pdf(\?|$)/)) {
            console.log(`[PDF] ${badgeName}: ${url}`);
            updated[badgeName] = Date.now();

            return savePdfAndText(
                url,
                `site/merit-badges/${badgeName}/${badgeName}.pdf`
            );
        }

        // "Web" merit badges go to a dedicated page.
        return getHtmlDom(url).then((secondDom) => {
            let found = 0;

            return domQuery(
                secondDom,
                // data-id 30a3852 is either for American Business's previous requirements or a generic previous requirements button
                '[data-widget_type="button.default"]:not([data-settings]):not([data-id="30a3852"]) a[href*=".pdf"]',
                (secondLink) => {
                    found += 1;
                    const secondUrl = resolveUrl(secondLink, secondDom);
                    console.log(`[WEB] ${badgeName}: ${secondUrl}`);
                    updated[badgeName] = Date.now();

                    return savePdfAndText(
                        secondUrl,
                        `site/merit-badges/${badgeName}/${badgeName}.pdf`
                    );
                }
            ).then(() => {
                if (found !== 1) {
                    throw new Error(
                        `Expected 1 link for ${badgeName} and found ${found}`
                    );
                }
            });
        });
    }

    function fetchPage(page) {
        subheading(`Fetching page ${page}`);
        let url = "https://www.scouting.org/skills/merit-badges/all/";

        if (page > 1) {
            url += `page/${page}/`;
        }

        return getHtmlDom(url).then((dom) => {
            // Merit badge names that link to PDF documents use 874908e
            // Merit badge names that link to HTML documents use 93e56cd
            return domQuery(
                dom,
                '[data-id="874908e"] h2 a, [data-id="93e56cd"] h2 a',
                fetchMeritBadge
            ).then(() => {
                const hits = domQuery(dom, `a[href*="/page/${page + 1}/"]`);

                if (hits.length) {
                    return fetchPage(page + 1);
                }

                return Promise.resolve();
            });
        });
    }

    heading("Merit Badges");
    debug("Cleaning old files");

    return globPromise("site/merit-badges/*/*.@(pdf|txt|html)")
        .then((files) =>
            serialPromises(files, (file) => {
                const parts = file.split("/");

                if (parts[2] === parts[3].replace(/\.(pdf|txt|html)$/, "")) {
                    return fsPromises.unlink(file);
                }

                return Promise.resolve();
            })
        )
        .then(() => fetchPage(1));
}

function downloadNovaAwards(updated) {
    function fetchPdf(link, dom, fileBase) {
        const url = resolveUrl(link, dom);
        const name = safeName(link.innerText);
        console.log(`${name}: ${url}`);
        updated[name] = Date.now();

        return savePdfAndText(url, `${fileBase}${name}/${name}.pdf`);
    }

    heading("Nova Awards");
    subheading("Cub Scouts Nova Awards");

    return getHtmlDom(
        "https://www.scouting.org/stem-nova-awards/awards/cub-scout/"
    )
        .then((dom) => {
            return domQuery(
                dom,
                '[data-id="73543ea7"] a[href*=".pdf"]',
                (link) => fetchPdf(link, dom, "site/nova-lab/cub-scouts/")
            );
        })
        .then(() => {
            subheading("Scouts BSA Nova Awards");

            return getHtmlDom(
                "https://www.scouting.org/stem-nova-awards/awards/scouts-bsa/"
            );
        })
        .then((dom) => {
            return domQuery(dom, '[data-id="9786783"] a[href*="pdf"]', (link) =>
                fetchPdf(link, dom, "site/nova-lab/scouts-bsa/")
            );
        })
        .then(() => {
            subheading("Venturing and Sea Scouts Nova Awards");

            return getHtmlDom(
                "https://www.scouting.org/stem-nova-awards/awards/venturer/"
            );
        })
        .then((dom) => {
            return domQuery(dom, '[data-id="259c931"] a[href*="pdf"]', (link) =>
                fetchPdf(link, dom, "site/nova-lab/venturing-and-sea-scouts/")
            );
        });
}

function downloadList(updated, updatedPrefix, list) {
    return serialPromises(list, (item) => {
        if (item.dest.match(".html.orig")) {
            console.log(`${item.key}: ${item.url}`);
            updated[item.key] = Date.now();

            return saveHtml(item.url, item.dest, item.selector);
        }

        return getHtmlDom(item.url).then((dom) => {
            const links = domQuery(dom, item.selector);

            if (links.length !== 1) {
                throw new Error(
                    `Expected 1 link and found ${links.length}: ${item.url} ${item.selector}`
                );
            }

            const url = resolveUrl(links[0], dom);
            console.log(`${item.key}: ${url}`);
            updated[item.key] = Date.now();

            return savePdfAndText(url, item.dest);
        });
    });
}

function downloadOtherAwards(updated) {
    const otherAwards = [
        {
            key: "50-miler",
            url: "https://www.scouting.org/awards/awards-central/50-miler/",
            dest: "site/other-awards/50-miler/application.pdf",
            selector: 'a[href*=pdf]'
        },
        {
            key: "aquatics-guide",
            url: "https://www.scouting.org/awards/awards-central/boardsailing/",
            dest: "site/other-awards/aquatics-guide.pdf",
            selector: 'a[href*=pdf]'
        },
        {
            key: "cyber-chip-grades-6-to-8",
            url: "https://www.scouting.org/training/youth-protection/cyber-chip/grades-6-8/",
            dest: "site/other-awards/cyber-chip/cyber-chip-grades-6-to-8.html.orig",
            selector: "#post-35851"
        },
        {
            key: "cyber-chip-grades-9-to-12",
            url: "https://www.scouting.org/training/youth-protection/cyber-chip/grades-9-12/",
            dest: "site/other-awards/cyber-chip/cyber-chip-grades-9-to-12.html.orig",
            selector: "#post-35852"
        },
        {
            key: "cyber-chip-student-project-kit",
            url: "https://www.scouting.org/training/youth-protection/cyber-chip/grades-9-12/",
            dest: "site/other-awards/cyber-chip/student-project-kit.pdf",
            selector: '#post-35852 a[href*=".pdf"]'
        },
        {
            key: "totin-chip",
            url: "https://www.scouting.org/awards/awards-central/totin-chip/",
            dest: "site/other-awards/totin-chip/totin-chip.html.orig",
            selector: ".entry-content"
        }
    ];

    heading("Other Awards");

    return downloadList(updated, 'other-awards', otherAwards);
}

function downloadScoutRanks(updated) {
    const url = "https://www.scouting.org/programs/scouts-bsa/advancement-and-awards/";
    heading("Scout Ranks");

    return downloadList(updated, 'scout-ranks', [
        {
            key: "scout",
            url,
            dest: "site/scout-ranks/scout/scout-rank-requirements.pdf",
            selector: "a[href*=\".pdf\"]:contains(\"Scout Rank Requirements\")"
        },
        {
            key: "tenderfoot",
            url,
            dest: "site/scout-ranks/tenderfoot/tenderfoot-rank-requirements.pdf",
            selector: "a[href*=\".pdf\"]:contains(\"Tenderfoot Rank Requirements\")"
        },
        {
            key: "second-class",
            url,
            dest: "site/scout-ranks/second-class/second-class-rank-requirements.pdf",
            selector: "a[href*=\".pdf\"]:contains(\"Second Class Rank Requirements\")"
        },
        {
            key: "first-class",
            url,
            dest: "site/scout-ranks/first-class/first-class-rank-requirements.pdf",
            selector: "a[href*=\".pdf\"]:contains(\"First Class Rank Requirements\")"
        },
        {
            key: "star",
            url,
            dest: "site/scout-ranks/star/star-rank-requirements.pdf",
            selector: "a[href*=\".pdf\"]:contains(\"Star Rank Requirements\")"
        },
        {
            key: "life",
            url,
            dest: "site/scout-ranks/life/life-rank-requirements.pdf",
            selector: "a[href*=\".pdf\"]:contains(\"Life Rank Requirements\")"
        },
        {
            key: "eagle",
            url,
            dest: "site/scout-ranks/eagle/eagle-rank-requirements.pdf",
            selector: "a[href*=\".pdf\"]:contains(\"Eagle Rank Requirements\")"
        },
        {
            key: "eagle-palms",
            url,
            dest: "site/scout-ranks/eagle-palms/eagle-palms.pdf",
            selector: "a[href*=\".pdf\"]:contains(\"Eagle Palms\")"
        },
        {
            key: "alternative-requirements",
            url,
            dest: "site/scout-ranks/alternative-requirements/alternative-requirements.pdf",
            selector: "a[href*=\".pdf\"]:contains(\"Ranks Alternative Requirements\")"
        },
        {
            key: "eagle-alternative-requirements",
            url,
            dest: "site/scout-ranks/eagle-alternative-requirements/eagle-alternative-requirements.pdf",
            selector: "a[href*=\".pdf\"]:contains(\"Eagle Scout Rank Alternative Requirements\")"
        }
    ]);
}

function downloadSupernovaAwards(updated) {
    function downloadProgramAwards(program, url, selector, mapping) {
        subheading(program);

        return getHtmlDom(url).then((dom) => {
            return domQuery(dom, selector, (link) => {
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

                return savePdfAndText(
                    pdfUrl,
                    `site/nova-lab/supernova/${name}/${name}.pdf`
                );
            });
        });
    }

    heading("Supernova Awards");

    return downloadProgramAwards(
        "Cub Scouts",
        "https://www.scouting.org/stem-nova-awards/awards/cub-scout/",
        '[data-id="2b32d13"] a[href*=".pdf"]',
        {
            "the-dr-louis-w-alvarez-supernova-award": "dr-luis-walter-alvarez",
            "the-dr-charles-townes-supernova-award": "dr-charles-h-townes"
        }
    )
        .then(() =>
            downloadProgramAwards(
                "Scouts BSA",
                "https://www.scouting.org/stem-nova-awards/awards/scouts-bsa/",
                '[data-id="699347f"] a[href*=".pdf"]:not([href*="Supernova-Application"]):not([href*="flowchart"]):not([href*="Flow-Chart"])',
                {
                    "dr-bernard-harris-requirements": "dr-bernard-harris",
                    "thomas-edison-requirements": "thomas-alva-edison",
                    "dr-albert-einstein-requirements": "dr-albert-einstein" // Same as Venturing
                }
            )
        )
        .then(() =>
            downloadProgramAwards(
                "Venturing and Sea Scouting",
                "https://www.scouting.org/stem-nova-awards/awards/venturer/",
                '[data-id="97f67b6"] a[href*=".pdf"]:not([href*="Supernova-Application"]):not([href*="flowchart"]):not([href*="Flow-Chart"])',
                {
                    "dr-sally-ride-requirements": "dr-sally-ride",
                    "wright-brothers-requirements": "wright-brothers",
                    "dr-albert-einstein-requirements": "dr-albert-einstein" // Same as Scouts BSA
                }
            )
        )
        .then(() => {
            subheading("Additional Materials");

            return downloadList(updated, 'supernova', [
                {
                    key: "activity-topics",
                    url: "https://www.scouting.org/stem-nova-awards/awards/venturer-supernova-topics/",
                    dest: "site/nova-lab/supernova/activity-topics/activity-topics.html.orig",
                    selector: '[data-id="74ca43fb"]'
                },
                {
                    key: "award-application",
                    url: "https://www.scouting.org/stem-nova-awards/awards/cub-scout/",
                    dest: "site/nova-lab/supernova/award-application.pdf",
                    selector: '[data-id="d291cac"] a[href*=".pdf"]'
                },
                {
                    key: "einstein-supernova-application",
                    url: "https://www.scouting.org/stem-nova-awards/awards/scouts-bsa/",
                    dest: "site/nova-lab/supernova/dr-albert-einstein/einstein-supernova-application.pdf",
                    selector:
                        '[data-id="b009a02"] a[href*="Supernova-Application"]'
                },
                {
                    key: "einstein-supernova-flowchart",
                    url: "https://www.scouting.org/stem-nova-awards/awards/scouts-bsa/",
                    dest: "site/nova-lab/supernova/dr-albert-einstein/einstein-supernova-flowchart.pdf",
                    selector:
                        '[data-id="b009a02"] a[href*="Process-Flow-Chart"]'
                },
                {
                    key: "einstein-supernova-guide",
                    url: "https://www.scouting.org/stem-nova-awards/awards/scouts-bsa/",
                    dest: "site/nova-lab/supernova/dr-albert-einstein/einstein-supernova-guide.pdf",
                    selector: '[data-id="b009a02"] a[href*="Einstein-Guide"]'
                },
                {
                    key: "exploration-requirements",
                    url: "https://www.scouting.org/stem-nova-awards/awards/venturer/",
                    dest: "site/nova-lab/explorations/exploration-requirements.pdf",
                    selector: '[data-id="9096690"] a[href*=".pdf"]'
                }
            ]);
        });
}

function help() {
    let result = `Usage:
    download-updates [OPTIONS] TARGET...

Options:

    --help            Show this help message

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
    readJson("updated.json")
        .then((updated) => {
            return serialPromises(downloadables, (item) => {
                if (
                    args.TARGET.includes(item.key) ||
                    args.TARGET.includes("all")
                ) {
                    if (!updated[item.key]) {
                        updated[item.key] = {};
                    }

                    return item.fn(updated[item.key]);
                }

                return Promise.resolve();
            }).then(() => writeJson("updated.json", updated));
        })
        .catch((err) => console.error(err));
}
