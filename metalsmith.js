const metalsmithSite = require("@fidian/metalsmith-site");
const path = require("path");

metalsmithSite.run(
    {
        baseDirectory: __dirname,
        buildAfter: (sugar) => {
            if (process.env.MINIFY) {
                sugar.use("metalsmith-babel", {
                    presets: ["@babel/preset-env"]
                });
                sugar.use("metalsmith-uglify", {
                    sameName: true,
                    uglify: {
                        sourceMap: false
                    }
                });
                sugar.use("@fidian/metalsmith-clean-css", {
                    files: "**/*.css"
                });
                sugar.use("metalsmith-html-minifier");
            }

            sugar.use((files, metalsmith, d) => {
                d();
            });
        },
        buildBefore: (sugar) => {
            // Translate Unicode
            sugar.use(path.join(__dirname, "/plugins/translate-unicode"));
        },
        contentsBefore: (sugar) => {
            // Pre-process events so they can be included into the index page. Only
            // the index page may include the events because the links and images
            // are made with the rootPath.
            sugar.use("metalsmith-handlebars-contents", {
                helpers: ["./handlebars/helpers/**/*.js"],
                match: ["events/*.md"],
                partials: ["./handlebars/partials/**/*"]
            });
            sugar.use("metalsmith-browserify-alt");
        },
        metadataAfter: (sugar) => {
            // "Fix" the rootPath for events because they are embedded into the index page,
            // so their rootPath should be "".
            sugar.use((files, metalsmith, done) => {
                for (const key of Object.keys(files)) {
                    if (key.match(/^events\//)) {
                        files[key].rootPath = "";
                    }
                }
                done();
            });

            // Likewise, change the rootPath for the 404 page because it could be
            // loaded at any path.
            sugar.use((files, metalsmith, done) => {
                files["404.md"].rootPath = "/";
                done();
            });

            // Verify all data against schemas
            sugar.use(path.join(__dirname, "/plugins/validate-data"));

            // Remove merit badge pamphlets and other non-linked data
            sugar.use(
                path.join(__dirname, "/plugins/remove-unnecessary-assets")
            );
        },
        redirectsAfter: (sugar) => {
            // Eliminate the event files - they are no longer needed
            sugar.use((files, metalsmith, done) => {
                for (const key of Object.keys(files)) {
                    if (key.match(/^events\//)) {
                        delete files[key];
                    }
                }
                done();
            });
            if (process.env.CHECK_LINKS) {
                sugar.use("@fidian/metalsmith-link-checker", {
                    ignore: [/^https?:\/\//]
                });
            }
        }
    },
    (err) => {
        if (err) {
            console.error(`${err}`);
            process.exit(-1);
        }
    }
);
