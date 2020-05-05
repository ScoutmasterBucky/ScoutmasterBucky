const metalsmithSite = require('@fidian/metalsmith-site');
const os = require('os');
let lastFiles = null;  // For PDF generation

metalsmithSite.run({
    baseDirectory: __dirname,
    buildAfter: (sugar) => {
        sugar.use((files, metalsmith, d) => {
            lastFiles = files;
            d();
        });
    },
    contentsAfter: (sugar) => {
        sugar.use(__dirname + '/plugins/workbook-header-footer');
    },
    contentsBefore: (sugar) => {
        // Pre-process events so they can be included into the index page. Only
        // the index page may include the events because the links and images
        // are made with the rootPath.
        sugar.use("metalsmith-handlebars-contents", {
            helpers: ["./pages/helpers/**/*.js"],
            match: ["events/*.md"],
            partials: ["./pages/partials/**/*"]
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
});

const pdfCache = {};
const path = require("path");
const wkhtmltopdf = require("wkhtmltopdf");

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
