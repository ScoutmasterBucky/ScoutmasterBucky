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
            sugar.use("metalsmith-relative-links");
        },
        contentsBefore: (sugar) => {
            sugar.use("metalsmith-browserify-alt");
        },
        metadataAfter: (sugar) => {
            // Change the rootPath for the 404 page because it could be
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
