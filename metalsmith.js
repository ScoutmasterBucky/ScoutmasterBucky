function defaultMetadata() {
    const defaults = {};

    if (process.env.SERVE) {
        defaults.liveReload = true;
    }

    defaults.buildDate = new Date().toISOString();
    const meritBadges = require("./merit-badges.json");
    defaults.meritBadges = meritBadges;
    const meritBadgeMeta = {
        active: Object.values(meritBadges).filter((x) => x.active)
    };
    meritBadgeMeta.activeCount = meritBadgeMeta.active.length;
    defaults.meritBadgeMeta = meritBadgeMeta;

    return {
        pattern: "**/*",
        defaults: defaults
    };
}

function build(serve, done) {
    // Clear the require cache
    Object.keys(require.cache).forEach((key) => delete require.cache[key]);

    /* ********************************************************************
     * Make the new Metalsmith object
     ******************************************************************* */
    const sugar = require("metalsmith-sugar")({
        clean: true,
        destination: "./build",
        metadata: {}, // Cloned
        source: "./site"
    });

    // Inject default metadata from metadata.json
    sugar.use("metalsmith-default-values", [defaultMetadata()]);

    /* ********************************************************************
     * Markdown -> HTML
     *
     * Must happen before CSS for Atomizer plugin.
     ******************************************************************* */
    // Set up links so indices and automatic subpage listings can be generated
    // within a document.
    sugar.use("metalsmith-ancestry");

    // Allow Mustache templates to build sub-links
    sugar.use("metalsmith-relative-links");

    // Add a `rootPath` metadata property to all files.  It's relative, allowing
    // the site to be hosted under any path.  "" = at root, or could be "../" or
    // "../../" etc.
    sugar.use("metalsmith-rootpath");

    // "Fix" the rootPath for events because they are embedded into the index page,
    // so their rootPath should be "".
    sugar.use("metalsmith-each", (file, filename) => {
        if (filename.match(/^events\//)) {
            file.rootPath = "";
        }
    });

    // Process Markdown with Handlebars. First handle the events so they can be
    // included into the index page. Only the index page may include the events
    // because the links and images are made with the rootPath from above.
    sugar.use("metalsmith-handlebars-contents", {
        helpers: ["./helpers/**/*.js"],
        match: ["events/*.md"]
    });
    sugar.use("metalsmith-handlebars-contents", {
        helpers: ["./helpers/**/*.js"]
    });

    // Then change Markdown to HTML
    sugar.use("metalsmith-markdown");

    // Wrap HTML content in layouts and allow layout files to use Mustache-like
    // syntax.
    sugar.use("metalsmith-handlebars-layouts", {
        helpers: ["./layouts/helpers/**/*.js"]
    });

    // Rename *.md to *.html
    sugar.use("metalsmith-rename", [[/\.md$/, ".html"]]);

    sugar.use(__dirname + "/plugins/workbook-header-footer");

    // Generate CSS from HTML using Atomizer.
    sugar.use("metalsmith-atomizer", require("./atomizer-config.json"));

    sugar.use("metalsmith-redirect", {
        htmlExtensions: [".htm", ".html"],
        redirections: require("./redirects.json")
    });

    if (serve) {
        // Serve files with livereload enabled.
        sugar.use("metalsmith-serve", {
            // verbose: true,
            http_error_files: {
                404: "/404.html"
            }
        });
    }

    // Store the files so we can generate PDFs later
    let lastFiles = null;

    sugar.use((files, metalsmith, d) => {
        lastFiles = files;
        d();
    });
    sugar.build((err) => {
        if (err) {
            done(err);
        } else {
            generatePdfs(lastFiles, done);
        }
    });
}

const pdfCache = {};
const path = require("path");
const wkhtmltopdf = require("wkhtmltopdf");

function generatePdfs(files, done) {
    let p = Promise.resolve(null);
    let needed = 0;
    let current = 0;

    Object.keys(files).forEach((filename) => {
        const file = files[filename];

        if (!file.workbook) {
            return;
        }

        const filenameBase = filename.replace(/[^/]*$/, "");
        const headerName = filenameBase + "header.html";
        const footerName = filenameBase + "footer.html";
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

        p = p.then(() => {
            return new Promise((resolve, reject) => {
                current += 1;
                console.log(`Creating ${pdf} (${current}/${needed})`);
                const stream = wkhtmltopdf(
                    "http://localhost:8080/" + filename,
                    {
                        // debug: true,
                        // debugStdOut: true,
                        printMediaType: true,
                        enableForms: true,
                        marginTop: "1in",
                        marginBottom: ".55in",
                        marginLeft: ".25in",
                        marginRight: ".25in",
                        headerHtml: "http://localhost:8080/" + headerName,
                        footerHtml: "http://localhost:8080/" + footerName,
                        output: "build/" + pdf
                    }
                );
                stream.on("error", (e) => {
                    reject(e);
                });
                stream.on("end", () => {
                    resolve();
                });
            });
        });
    });

    p.then(done, done);
}

if (process.env.SERVE) {
    const livereload = require("livereload");
    const watch = require("glob-watcher");

    const reloadServer = livereload.createServer();
    build(true, (err) => {
        if (err) {
            throw err;
        }

        console.log("Server started, build complete, watching for changes");

        watch(
            [
                "site/**",
                "helpers/**",
                "layouts/**",
                "partials/**",
                "atomizer-config.json",
                "redirects.json"
            ],
            (done) => {
                // Do not set "serve" to true here. The server is already running.
                build(false, (err) => {
                    if (err) {
                        console.error(err);
                    }

                    reloadServer.refresh("");
                    done(err);
                });
            }
        );
    });
} else {
    build(() => {});
}
