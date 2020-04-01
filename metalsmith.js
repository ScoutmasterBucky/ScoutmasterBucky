/* ********************************************************************
 * Make the new Metalsmith object
 ******************************************************************* */
const sugar = require("metalsmith-sugar")({
    clean: true,
    destination: "./build",
    metadata: {}, // Cloned
    source: "./site"
});

const defaultMetadata = {
    pattern: "**/*",
    defaults: {}
};

sugar.use("metalsmith-on-build", () => {
    // Clear the require cache
    Object.keys(require.cache).forEach((key) => delete require.cache[key]);

    // Load or reload metadata
    const metadata = require("./metadata.json");

    if (process.env.SERVE) {
        metadata.liveReload = true;
    }

    defaultMetadata.defaults = metadata;
});

// Inject default metadata from metadata.json
sugar.use("metalsmith-default-values", [defaultMetadata]);

// Load files referenced in `data` metadata property.
sugar.use("metalsmith-data-loader", {
    removeSource: true
});

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

// Add `propName?` and `_parent` properties throughout the metadata.  This
// is added early for mustache parsing in markdown before templating.
sugar.use("metalsmith-mustache-metadata", {
    match: "**/*.md"
});

// Add a `rootPath` metadata property to all files.  It's relative, allowing
// the site to be hosted under any path.  "" = at root, or could be "../" or
// "../../" etc.
sugar.use("metalsmith-rootpath");

// Process Markdown with Handlebars first
sugar.use("metalsmith-handlebars-contents", {
    helpers: ['./helpers/**/*.js']
});

// Then change Markdown to HTML
sugar.use("metalsmith-markdown");

// Wrap HTML content in layouts and allow layout files to use Mustache-like
// syntax.
sugar.use("metalsmith-handlebars-layouts", {
    helpers: ['./layouts/helpers/**/*.js']
});

// Rename *.md to *.html
sugar.use("metalsmith-rename", [[/\.md$/, ".html"]]);

// Generate CSS from HTML using Atomizer.
sugar.use("metalsmith-atomizer", {
    acssConfig: {
        breakPoints: {
            xs: "@media screen and (max-width: 575px)",
            s: "@media screen and (max-width: 768px)",
            m: "@media screen and (max-width: 992px)",
            l: "@media screen and (max-width: 1002px)"
        },
        custom: {
            smbPageBackground: "black",
            smbPageForeground: "white",
            smbPageSecondaryText: "#719D3E",
            smbButtonBarBackground: "#a4c57c",
            smbButtonBackground: "#5b8800",
            smbButtonText: "white",
            smbButtonCaptionText: "black",
            smbHeadingBackground: "#5b8800",
            smbHeadingText: "white"
        },
        rules: [
            {
                type: 'helper',
                id: 'Fill',
                name: 'Fill',
                matcher: 'Fill',
                noParams: false,
                styles: {
                    fill: "$0"
                }
            }
        ]
    },
    destination: "atomic.css"
});

if (process.env.SERVE) {
    // Serve files with livereload enabled.
    sugar.use("metalsmith-serve", {
        http_error_files: {
            404: "/404.html"
        },
        verbose: true
    });
    // When files change, build them again.
    sugar.use("metalsmith-watch", {
        livereload: true,
        paths: {
            "${source}/**/*.html": "**/*.{html,md,css,js}",
            "${source}/**/*.md": "**/*.{html,md,css,js}",
            "${source}/**/*.css": "**/*.{html,md,css,js}",
            "${source}/**/*.js": "**/*.{html,md,css,js}",
            "${source}/**/*.jpg": true,
            "helpers/**/*": "**/*.{html,md,css,js}",
            "layouts/**/*": "**/*.{html,md,css,js}",
            "partials/**/*": "**/*.{html,md,css,js}"
        }
    });
}

sugar.build();
