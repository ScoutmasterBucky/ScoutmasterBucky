#!/usr/bin/env bun

import chalk from 'chalk';
import jsonStableStringify from 'json-stable-stringify';
import neodoc from 'neodoc';
import { parseHTML } from 'linkedom';
import path from 'node:path';
import * as prettier from 'prettier';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';
import { glob, rename, readFile, writeFile, unlink } from 'node:fs/promises';
import { Driver, Element } from 'cloud-one';
import debug from 'debug';

type DOM = Window & typeof globalThis & { requestUrl: string };
type UpdatedSingle = Record<string, number>;
type UpdatedAll = Record<string, UpdatedSingle>;
interface Downloader {
    key: string;
    desc: string;
    fn: (updated: UpdatedSingle, args: any) => Promise<void>;
}
interface DownloadableListItem {
    dest: string;
    key: string;
    selector: string;
    url: string;
}
interface Args {
    ['--help']?: boolean;
    ['--filter']?: string;
    TARGET: string[];
}

const driver = new Driver();
let errorsDetected = false;

const downloadables: Downloader[] = [
    {
        key: 'counselor-info',
        desc: 'Counselor information pages for merit badges',
        fn: downloadCounselorInformation,
    },
    {
        key: 'merit-badges',
        desc: 'Scouts BSA merit badges',
        fn: downloadMeritBadges,
    },
    {
        key: 'other-awards',
        desc: 'One-off awards',
        fn: downloadOtherAwards,
    },
    {
        key: 'scout-ranks',
        desc: 'Scout ranks',
        fn: downloadScoutRanks,
    },
    {
        key: 'test-labs',
        desc: 'Test Lab',
        fn: downloadTestLab,
    },
];

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

const debugReadJson = debug('readJson');
async function readJson(fn: string) {
    const content = await readFile(fn);
    debugReadJson('Read %d bytes from %s', content.length, fn);

    return JSON.parse(content.toString());
}

const debugWriteJson = debug('writeJson');
async function writeJson(fn: string, data: any) {
    debugWriteJson('Writing JSON to %s', fn);
    await writeFile(fn, `${jsonStableStringify(data, { space: 4 })}\n`);
}

function heading(msg: string) {
    console.log(chalk.inverse(`--- ${msg} ---`));
}

function subheading(msg: string) {
    console.log(chalk.underline(msg));
}

const debugSafeName = debug('safeName');
function safeName(name: string) {
    const safe = name
        .toLowerCase()
        .replace(/[!,]/g, ' ') // "signs, signals, and codes"  "1-2-3 go!"
        .replace(/&/g, ' and ') // "fish & wildlife management"
        .replace(/^reptile and amphibian$/, 'reptile-and-amphibian-study')
        .trim()
        .replace(/ +/g, '-');
    debugSafeName('Converted "%s" to "%s"', name, safe);
    return safe;
}

const debugGetHtmlDom = debug('getHtmlDom');
async function getHtmlDom(url: string, selector: string) {
    if (driver.url !== url) {
        debugGetHtmlDom('Navigating to %s', url);
        await driver.get(url, { bypassCloudflare: true });
    } else {
        debugGetHtmlDom('Already at %s, not navigating', url);
    }

    const result = await driver.selectAll(selector);
    debugGetHtmlDom(
        'Found %d elements for selector "%s" on %s',
        result.length,
        selector,
        url
    );

    return result;
}

const debugGetPdfText = debug('getPdfText');
async function getPdfText(body: NonSharedBuffer) {
    function tokensToText(textTokens: any) {
        return textTokens.items
            .map((token: any) => {
                if (!token.width && !token.height) {
                    return '\n';
                }

                const eol = token.hasEOL ? '\n' : '';

                return `${token.str}${eol}`;
            })
            .join('');
    }

    async function getPage(page: number) {
        if (page > pdf.numPages) {
            return result;
        }

        debugGetPdfText('Processing page %d of %d', page, pdf.numPages);
        const pageData = await pdf.getPage(page);
        const textTokens = await pageData.getTextContent();
        const text = tokensToText(textTokens);
        result.push(text);

        return getPage(page + 1);
    }

    const pdf = await getDocument({
        data: new Uint8Array(body),
        verbosity: 0,
    }).promise;
    const result: string[] = [];
    const textArray = await getPage(1);
    return textArray.join('\n\n\n');
}

const debugSaveBinaryFile = debug('saveBinaryFile');
async function saveBinaryFile(url: string, destPath: string) {
    return new Promise<string>(async (resolve, reject) => {
        const connection = (driver as any).browser.connection;

        debugSaveBinaryFile(
            'Configuring browser to download file from %s to %s',
            url,
            destPath
        );
        await connection.send('Browser.setDownloadBehavior', {
            behavior: 'allowAndName', // Allow downloads and name it after the GUID
            downloadPath: path.dirname(destPath),
            eventsEnabled: true, // So we can tell when the download finishes and get the GUID
        });
        const downloadListener = async (event: any) => {
            debugSaveBinaryFile('Download progress event: %o', event);
            if (event.state === 'completed') {
                debugSaveBinaryFile(
                    'Download completed for %s with GUID %s',
                    url,
                    event.guid
                );
                resolve(event.filePath);
                connection.off('Browser.downloadProgress', downloadListener);
            } else if (event.state === 'interrupted') {
                debugSaveBinaryFile('Download interrupted for %s', url);
                reject(new Error(`Download interrupted: ${url}`));
            }
        }
        connection.on('Browser.downloadProgress', downloadListener);
        debugSaveBinaryFile('Navigating to %s to trigger download', url);
        try {
            // It is expected that this throws because it's converted from a
            // navigation event to a download
            await driver.get(url, { bypassCloudflare: true });
        } catch (_ignore) {
        }
    }).then(async filePath => {
        debugSaveBinaryFile(
            'Renaming downloaded file from %s to %s',
            filePath,
            destPath
        );
        await rename(filePath, destPath);
        if (destPath.match(/\.pdf$/)) {
            debugSaveBinaryFile('Converting PDF at %s to text', destPath);
            // Also convert PDF to text for easier detection of what changed
            const text = await getPdfText(await readFile(destPath));
            const destTextPath = destPath.replace(/\.pdf$/, '.txt');
            debugSaveBinaryFile('Writing extracted text to %s', destTextPath);
            await writeFile(destTextPath, text);
        }
    });
}

const debugSaveHtml = debug('saveHtml');
async function saveHtml(url: string, destHtml: string, selector: string) {
    debugSaveHtml(
        'Saving HTML from %s to %s using selector "%s"',
        url,
        destHtml,
        selector
    );
    selector = selector || 'html';
    const result = await getHtmlDom(url, selector || 'html');
    debugSaveHtml(
        'Found %d elements for selector "%s" on %s',
        result.length,
        selector,
        url
    );

    if (result.length !== 1) {
        throw new Error(
            `Expected exactly one result instead of ${result.length} for selector: ${selector}`
        );
    }

    const content = (await result[0].getHtml()).replace(/\r\n?/g, '\n');
    const pretty = await prettier.format(content, { parser: 'html' });
    debugSaveHtml('Writing pretty HTML to %s', destHtml);
    await writeFile(destHtml, pretty);
}

const debugResolveUrl = debug('resolveUrl');
async function resolveUrl(link: Element, base: string): Promise<string> {
    debugResolveUrl('Resolving URL from link element with base "%s"', base);
    const str = await link.getAttribute('href');
    debugResolveUrl(
        'Resolving URL from link with href "%s" and base "%s"',
        str,
        base
    );
    if (!str) {
        throw new Error('Link does not have href attribute');
    }
    const result = new URL(str, base).toString();
    debugResolveUrl('Resolved URL: %s', result);
    return result;
}

const debugDownloadCounselorInformation = debug('downloadCounselorInformation');
async function downloadCounselorInformation(updated: UpdatedSingle) {
    heading('Counselor Information');
    const indexUrl =
        'https://www.scouting.org/skills/merit-badges/counselor-information/';
    debugDownloadCounselorInformation(
        'Downloading counselor information from index URL: %s',
        indexUrl
    );
    await saveHtml(
        indexUrl,
        'src/data/counselor-information.html.orig',
        '[data-id="7627899f"]'
    );
    debugDownloadCounselorInformation(
        'Downloading counselor information files linked from index page'
    );
    await downloadList(updated, 'counselor-information', [
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
            key: 'citizenship-in-society-counselor-guide',
            url: indexUrl,
            dest: 'download/citizenship-in-society-counselor-guide.pdf',
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
        {
            key: 'geocaching-counselor-guide',
            url: indexUrl,
            dest: 'download/geocaching-counselor-guide.pdf',
            selector: '[data-id="e6c9db3"] a',
        }
    ]);
}

const debugDownloadMeritBadges = debug('downloadMeritBadges');
async function downloadMeritBadges(updated: UpdatedSingle, args: Args) {
    async function fetchMeritBadge(linkResolved: string, linkText: string) {
        let badgeName = safeName(linkText);
        debugDownloadMeritBadges(
            'Processing merit badge "%s" with URL %s',
            badgeName,
            linkResolved
        );

        if (
            args['--filter'] &&
            !badgeName.match(new RegExp(args['--filter']))
        ) {
            debugDownloadMeritBadges(
                'Skipping merit badge "%s" due to filter "%s"',
                badgeName,
                args['--filter']
            );
            return;
        }

        // Load the merit badge page
        console.log(`[Requirements] ${badgeName}: ${linkResolved}`);
        const dest = `src/data/merit-badges/${badgeName}/${badgeName}.html.orig`;

        // .mb-requirement-container works for most merit badges, but
        // "small-boat-sailing" is slightly different. Possibly others.
        await saveHtml(linkResolved, dest, ':has(> .mb-requirement-container)');

        // Download the pamphlet
        debugDownloadMeritBadges('Looking for pamphlet link on %s', linkResolved);
        const links = await getHtmlDom(
            linkResolved,
            '.mb-scoutshop-pamphlet a[href*=".pdf"]'
        );

        if (links.length > 1) {
            console.log(
                chalk.red(`Multiple pamphlet links found for ${badgeName}:`)
            );
            console.log(
                links.map(link => (link as unknown as HTMLElement).outerHTML)
            );
            errorsDetected = true;
            return;
        }

        if (links.length > 0) {
            debugDownloadMeritBadges(
                'Pamphlet link found for %s, resolving URL',
                badgeName
            );
            const pamphletUrl = await resolveUrl(links[0], linkResolved);
            console.log(`[Pamphlet] ${badgeName}: ${pamphletUrl}`);
            const pamphletDest = `download/${badgeName}-pamphlet.pdf`;
            await saveBinaryFile(pamphletUrl.toString(), pamphletDest);
        }

        updated[badgeName] = Date.now();
    }

    heading('Merit Badges');

    if (args['--filter']) {
        console.log(
            chalk.yellow(
                'NOT REMOVING OLD FILES - Merit badges are being filtered'
            )
        );
    } else {
        debugDownloadMeritBadges('No filter applied, removing old files');
        for await (const file of glob('src/data/merit-badges/*/*.html.orig')) {
            // Safety check to delete only the original HTML that relates to the
            // one merit badge.
            const parts = file.split('/');

            if (`${parts[3]}.html.orig` === parts[4]) {
                debugDownloadMeritBadges('Removing old file: %s', file);
                await unlink(file);
            }
        }
    }

    debugDownloadMeritBadges(
        'Fetching merit badge index from %s',
        'https://www.scouting.org/skills/merit-badges/all/'
    );
    subheading(`Fetching merit badge index`);
    const indexUrl = 'https://www.scouting.org/skills/merit-badges/all/';
    const links = await getHtmlDom(
        indexUrl,
        '.mb-card .mb-title .mb-card-title a'
    );

    // Resolve all links
    const resolvedLinks: [string, string][] = [];

    for (const link of links) {
        const url = await resolveUrl(link, driver.url);
        const text = await link.getText();
        resolvedLinks.push([url, text]);
    }

    for (const link of resolvedLinks) {
        await fetchMeritBadge(link[0], link[1]);
    }
}

const debugDownloadList = debug('downloadList');
async function downloadList(
    updated: UpdatedSingle,
    updatedPrefix: string,
    list: DownloadableListItem[]
) {
    debugDownloadList(
        'Downloading list of %d items for prefix "%s"',
        list.length,
        updatedPrefix
    );
    for (const item of list) {
        debugDownloadList(
            'Processing item with key "%s" and URL %s',
            item.key,
            item.url
        );
        if (item.dest.match('.html.orig')) {
            debugDownloadList(
                'Item is an HTML file, saving HTML from %s to %s using selector "%s"',
                item.url,
                item.dest,
                item.selector
            );
            console.log(`${item.key}: ${item.url}`);
            updated[item.key] = Date.now();
            await saveHtml(item.url, item.dest, item.selector || 'html');

            return;
        }

        debugDownloadList(
            'Item is a binary file, looking for links on %s using selector "%s"',
            item.url,
            item.selector
        );
        const links = await getHtmlDom(item.url, item.selector || 'html');

        if (links.length !== 1) {
            for (const link of links) {
                console.log(await link.getOuterHtml());
            }
            throw new Error(
                `Expected 1 link and found ${links.length}: ${item.url} ${item.selector}`
            );
        }

        debugDownloadList('Resolving URL for item with key "%s"', item.key);
        const url = await resolveUrl(links[0], driver.url);
        console.log(`${item.key}: ${url}`);
        updated[item.key] = Date.now();
        await saveBinaryFile(url, item.dest);
    }
}

const debugDownloadOtherAwards = debug('downloadOtherAwards');
async function downloadOtherAwards(updated: UpdatedSingle) {
    debugDownloadOtherAwards('Downloading other awards');
    heading('Other Awards');
    await downloadList(updated, 'other-awards', [
        {
            key: '50-miler',
            url: 'https://www.scouting.org/awards/awards-central/50-miler/',
            dest: 'download/50-miler.pdf',
            selector: 'a[href*=pdf]',
        },
        {
            key: 'aquatics-guide',
            url: 'https://www.scouting.org/awards/awards-central/boardsailing/',
            dest: 'download/aquatics-guide.pdf',
            selector: 'a[href*=pdf]',
        },
        {
            key: 'conservation-good-turn-award',
            url: 'https://www.scouting.org/outdoor-programs/conservation-and-environment/conservation-good-turn/',
            dest: 'src/data/other-awards/conservation-good-turn-award/conservation-good-turn-award.html.orig',
            selector: '[data-id="bf81f70"]',
        },
        {
            key: 'complete-angler',
            url: 'https://www.scouting.org/awards/awards-central/',
            dest: 'download/complete-angler.pdf',
            selector: 'a[href*=Angler]',
        },
        {
            key: 'totin-chip',
            url: 'https://www.scouting.org/awards/awards-central/totin-chip/',
            dest: 'src/data/other-awards/totin-chip/totin-chip.html.orig',
            selector: '[data-id="7627899f"]',
        },
    ]);
}

const debugDownloadScoutRanks = debug('downloadScoutRanks');
async function downloadScoutRanks(updated: UpdatedSingle) {
    debugDownloadScoutRanks('Downloading Scout ranks');
    const url =
        'https://www.scouting.org/programs/scouts-bsa/advancement-and-awards/';
    heading('Scout Ranks');
    await downloadList(updated, 'scout-ranks', [
        {
            key: 'scout',
            url,
            dest: 'download/scout.pdf',
            selector: 'li:nth-child(3) a[href*="Scout-Rank" i][href*=".pdf"]:nth-child(1)',
        },
        {
            key: 'tenderfoot',
            url,
            dest: 'download/tenderfoot.pdf',
            selector: 'li:nth-child(4) a[href*="Tenderfoot-Rank" i][href*=".pdf"]:nth-child(1)'
        },
        {
            key: 'second-class',
            url,
            dest: 'download/second-class.pdf',
            selector:
                'li:nth-child(5) a[href*="Second-Class" i][href*=".pdf"]:nth-child(1)'
        },
        {
            key: 'first-class',
            url,
            dest: 'download/first-class.pdf',
            selector: 'li:nth-child(6) a[href*="First-Class" i][href*=".pdf"]:nth-child(1)'
        },
        {
            key: 'star',
            url,
            dest: 'download/star.pdf',
            selector: 'li:nth-child(8) a[href*="Star-Rank" i][href*=".pdf"]:nth-child(1)'
        },
        {
            key: 'life',
            url,
            dest: 'download/life.pdf',
            selector: 'li:nth-child(9) a[href*="Life-Rank" i][href*=".pdf"]:nth-child(1)'
        },
        // {
        //     key: 'eagle',
        //     url,
        //     dest: 'download/eagle.pdf',
        //     selector: 'li:nth-child(10) a[href*="Eagle-Rank" i][href*=".pdf"]:nth-child(1)'
        // },
        {
            key: 'eagle-palms',
            url,
            dest: 'download/eagle-palms.pdf',
            selector: 'li:nth-child(11) a[href*="Eagle-Palm" i][href*=".pdf"]:nth-child(1)'
        },
        // {
        //     key: 'eagle-palms',
        //     url,
        //     dest: 'download/eagle-palms.pdf',
        //     selector: 'li:nth-child(12) a[href*="Eagle-Palm" i][href*=".pdf"]:nth-child(1)'
        // },
        {
            key: 'alternative-requirements',
            url,
            dest: 'download/alternative-requirements.pdf',
            selector:
                'li:nth-child(7) a[href*="Alternate-Requirements" i][href*=".pdf"]:nth-child(1)'
        },
        // {
        //     key: 'eagle-alternative-requirements',
        //     url,
        //     dest: 'download/eagle-alternative-requirements.pdf',
        //     selector:
        //         'li:nth-child(11) a[href*="Eagle-Scout-Rank-Alternative-Requirements" i][href*=".pdf"]:nth-child(1)'
        // },
        {
            key: 'eagle-alternative-requirements',
            url,
            dest: 'download/eagle-alternative-requirements.pdf',
            selector:
                'li:nth-child(10) a[href*="Eagle-Scout-Rank-Alternative-Requirements" i][href*=".pdf"]:nth-child(1)'
        },
    ]);
}

const debugDownloadTestLab = debug('downloadTestLab');
async function downloadTestLab(updated: UpdatedSingle, args: Args) {
    async function fetchTestLab(linkResolved: string, linkText: string) {
        const name = safeName(linkText);
        console.log(`[Requirements] ${name}: ${linkResolved}`);
        const dest = `src/data/test-labs/${name}/${name}.html.orig`;
        await saveHtml(linkResolved, dest, '#page .e-con-inner');
        updated[name] = Date.now();
    }

    heading('Test Lab');

    subheading(`Fetching index`);
    debugDownloadTestLab('Downloading Test Lab index');
    const indexUrl = 'https://www.scouting.org/skills/merit-badges/test-lab/';
    await downloadList(updated, 'test-labs', [
        {
            key: 'test-labs',
            url: indexUrl,
            dest: 'src/data/test-labs/test-lab.html.orig',
            selector: '[data-id="3b0c127"]',
        },
    ]);

    debugDownloadTestLab(
        'Retrieving list of links to individual Test Lab pages from index page'
    );
    const links = await getHtmlDom(indexUrl, '[data-id="8f1ed05"] a');

    // Resolve all links
    const resolvedLinks: [string, string][] = [];

    for (const link of links) {
        const url = await resolveUrl(link, driver.url);
        const text = await link.getText();
        resolvedLinks.push([url, text]);
    }

    debugDownloadTestLab('Found %d Test Lab links on index page', links.length);

    for (const link of resolvedLinks) {
        debugDownloadTestLab('Processing Test Lab link');
        await fetchTestLab(link[0], link[1]);
    }
}

const debugMain = debug('main');
async function main() {
    debugMain('Parsing command-line arguments');
    const args = neodoc.run(help(), {
        laxPlacement: true,
    });

    const scriptDir = path.dirname(new URL(import.meta.url).pathname);
    process.chdir(scriptDir);

    let errors = false;
    debugMain('Starting browser');

    // Launching Chrome will change the debug flags
    // This is because of lighthouse-logger overriding the debug settings
    const saved = process.env.DEBUG;
    (debug as any).save();
    const saved2 = process.env.DEBUG || saved;
    await driver.start();
    (debug as any).save();
    const saved3 = process.env.DEBUG;
    const combined = [saved2, saved3].filter(Boolean).join(',');
    console.log(combined);
    debug.enable(combined);

    debugMain('Forcing PDF files to download');
    await driver.get('chrome://settings/content/pdfDocuments');
    const settingsUi = await driver.select('settings-ui');
    const settingsUiShadow = await settingsUi!.getShadowRoot();
    const settingsMain = await settingsUiShadow!.select('settings-main');
    const settingsMainShadow = await settingsMain!.getShadowRoot();
    const settingsPrivacyPageIndex = await settingsMainShadow!.select(
        'settings-privacy-page-index'
    );
    const settingsPrivacyPageIndexShadow =
        await settingsPrivacyPageIndex!.getShadowRoot();
    const settingsPdfDocumentsPage =
        await settingsPrivacyPageIndexShadow!.select(
            'settings-pdf-documents-page'
        );
    const settingsPdfDocumentsPageShadow =
        await settingsPdfDocumentsPage!.getShadowRoot();
    const settingsCollapseRadioButton =
        await settingsPdfDocumentsPageShadow!.select(
            'settings-collapse-radio-button[name="true"]'
        );
    const settingsCollapseRadioButtonShadow =
        await settingsCollapseRadioButton!.getShadowRoot();
    const disc = await settingsCollapseRadioButtonShadow!.select('.disc');
    await disc!.click();

    debugMain('Browser configured');
    await driver.get('https://www.scouting.org/', { bypassCloudflare: true });

    for (const target of args.TARGET) {
        let found = false;

        for (const item of downloadables) {
            if (item.key === target) {
                found = true;
            }
        }

        if (target === 'all') {
            found = true;
        }

        if (!found) {
            console.error('Unable to find target:', target);
            errors = true;
        }
    }

    debugMain('Targets have been verified');

    if (!errors) {
        debugMain('Reading updated.json');
        const updatedAll = (await readJson(
            'src/data/updated.json'
        )) as UpdatedAll;
        for (const item of downloadables) {
            if (args.TARGET.includes(item.key) || args.TARGET.includes('all')) {
                if (!updatedAll[item.key]) {
                    updatedAll[item.key] = {};
                }

                debugMain(
                    'Processing target "%s" with key "%s"',
                    item.desc,
                    item.key
                );
                await item.fn(updatedAll[item.key], args);
                debugMain(
                    'Finished processing target "%s", writing updated.json',
                    item.desc
                );
                await writeJson('src/data/updated.json', updatedAll);
            }
        }
    }

    if (errorsDetected) {
        console.error(chalk.red('Errors were detected during processing.'));
        process.exit(1);
    }

    driver.close();
}

main();
