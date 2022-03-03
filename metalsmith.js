const fs = require('fs');
const metalsmithSite = require('@fidian/metalsmith-site');
const os = require('os');
const path = require('path');
const tv4 = require('tv4');
const wkhtmltopdf = require("wkhtmltopdf");

// For PDF generation
const pdfCache = {};
let lastFiles = null;

// Load schemas to validata data. This is not recursive
const schemaFolder = path.resolve(__dirname, 'schemas');
for (fn of fs.readdirSync(schemaFolder)) {
    if (fn.match(/^[^.]/) && fn.match(/\.json$/)) {
        const resolvedFilename = path.resolve(schemaFolder, fn);
        tv4.addSchema(`/${fn}`, JSON.parse(fs.readFileSync(resolvedFilename, 'utf8')));
    }
}

metalsmithSite.run({
    baseDirectory: __dirname,
    buildAfter: (sugar) => {
        if (process.env.MINIFY) {
            sugar.use('metalsmith-babel', {
                presets: ["@babel/preset-env"]
            });
            sugar.use('metalsmith-uglify', {
                sameName: true,
                uglify: {
                    sourceMap: false
                }
            });
            sugar.use('metalsmith-clean-css', {
                files: "**/*.css"
            });
            sugar.use('metalsmith-html-minifier');
        }

        sugar.use((files, metalsmith, d) => {
            lastFiles = files;
            d();
        });
    },
    buildBefore: (sugar) => {
        // Translate Unicode
        sugar.use(__dirname + '/plugins/translate-unicode');
    },
    contentsAfter: (sugar) => {
        sugar.use(__dirname + '/plugins/workbook-header-footer');
    },
    contentsBefore: (sugar) => {
        // Pre-process events so they can be included into the index page. Only
        // the index page may include the events because the links and images
        // are made with the rootPath.
        sugar.use("metalsmith-handlebars-contents", {
            helpers: ["./handlebars/pages/helpers/**/*.js"],
            match: ["events/*.md"],
            partials: ["./handlebars/pages/partials/**/*"]
        });
    },
    metadataAfter: (sugar) => {
        // "Fix" the rootPath for events because they are embedded into the index page,
        // so their rootPath should be "".
        sugar.use((files, metalsmith, done) => {
            for (const key of Object.keys(files)) {
                if (key.match(/^events\//)) {
                    files[key].rootPath = '';
                }
            }
            done();
        });

        // Likewise, change the rootPath for the 404 page because it could be
        // loaded at any path.
        sugar.use((files, metalsmith, done) => {
            files['404.md'].rootPath = '/';
            done();
        });

        // Verify all data against schemas
        sugar.use((files, metalsmith, done) => {
            // Just do default metadata once
            validateOrThrow(files['404.md'].meritBadges, '/merit-badges.json');
            validateOrThrow(files['404.md'].novaAwards, '/nova-awards.json');
            validateOrThrow(files['404.md'].supernovaAwards, '/supernova-awards.json');

            for (const [filename, fileObj] of Object.entries(files)) {
                if (fileObj.data && fileObj.data.requirements) {
                    validateOrThrow(fileObj.data.requirements, '/requirement-list.json');
                }
            }

            done();
        });
    },
    postProcess: (done) => {
        generatePdfs(lastFiles, (e) => {
            if (e) {
                throw e;
            }

            if (process.env.KILL_AFTER_WORKBOOKS) {
                process.exit(0);
            }

            done(e);
        });
    }
}, err => {
    if (err) {
        console.error(err);
    }
});

function generatePdfs(files, done) {
    let list = [];
    let needed = 0;

    Object.keys(files).forEach((filename) => {
        const file = files[filename];

        if (!process.env.WORKBOOKS || !file.workbook) {
            return;
        }

        const filenameBase = filename.replace(/[^/]*$/, "");
        const headerName = filenameBase + "header.html";
        const footerName = filenameBase + "footer.html";

        if (!files[headerName] || !files[footerName]) {
            console.error('Workbook missing header or footer: ' + filenameBase);

            return;
        }

        fileContents = file.contents.toString();
        headerContents = files[headerName].contents.toString();
        footerContents = files[footerName].contents.toString();

        if (
            pdfCache[filename] === fileContents &&
            pdfCache[headerName] === headerContents &&
            pdfCache[footerName] === footerContents
        ) {
            return;
        }

        pdfCache[filename] = fileContents;
        pdfCache[headerName] = headerContents;
        pdfCache[footerName] = footerContents;
        const pdf = filenameBase + file.badge + "-workbook.pdf";
        needed += 1;
        list.push({
            pdf: pdf,
            filename: filename,
            headerName: headerName,
            footerName: footerName
        });
    });

    let running = 0;
    let current = 0;
    let error = null;
    let n = Math.max(1, os.cpus().length);

    if (list.length) {
        while (n--) {
            processPdf()
        }
    } else {
        processPdf();
    }

    function processPdf() {
        if (error) {
            return;
        }

        if (!list.length) {
            if (running === 0) {
                done();
            }

            return;
        }

        running += 1;
        const mine = list.shift();
        current += 1;
        console.log(`Creating ${mine.pdf} (${current}/${needed})`);
        const stream = wkhtmltopdf(
            "http://localhost:8080/" + mine.filename,
            {
                // debug: true,
                // debugStdOut: true,
                printMediaType: true,
                enableForms: true,
                marginTop: "1in",
                marginBottom: ".55in",
                marginLeft: ".25in",
                marginRight: ".25in",
                headerHtml: "http://localhost:8080/" + mine.headerName,
                footerHtml: "http://localhost:8080/" + mine.footerName,
                output: "build/" + mine.pdf
            }
        );
        stream.on("error", (e) => {
            if (!error) {
                error = e;
                done(error);
            }
        });
        stream.on("end", () => {
            running -= 1;
            processPdf();
        });
    }
}

function validateOrThrow(data, schemaPath) {
    const isValid = tv4.validate(data, schemaPath);

    if (tv4.missing && tv4.missing.length) {
        throw new Error(`Missing schemas: ${tv4.missing}`);
    }

    if (!isValid) {
        throw new Error(JSON.stringify(tv4.error, null, 4));
    }
}
