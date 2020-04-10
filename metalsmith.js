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
    metadata.site.buildDate = new Date().toISOString();

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

// Process Markdown with Handlebars.
sugar.use("metalsmith-handlebars-contents", {
    helpers: ['./helpers/**/*.js'],
    match: 'events/**/*.md'
});
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
            // Order matters for rule generation
            l: "@media screen and (max-width: 992px)", // Tablet landscape
            m: "@media screen and (max-width: 768px)", // Tablet portrait, phone landscape
            s: "@media screen and (max-width: 575px)" // Phone portrait
        },
        custom: {
            smbButtonBackground: "#5b8800",
            smbButtonBarBackground: "#a4c57c",
            smbButtonCaptionText: "black",
            smbButtonText: "white",
            smbEventMeritBadge: "#009933",
            smbEventOnline: "#CC9900",
            smbEventTitleText: "red",
            smbGold: '#CC9900',
            smbHeading3Text: "#336600",
            smbHeadingBackground: "#5b8800",
            smbHeadingText: "white",
            smbPageBackground: "black",
            smbPageForeground: "white",
            smbPageSecondaryText: "#719D3E",
            whiteGlow: '-2px 0 2px white, 0 -2px 2px white, 2px 0 2px white, 0 2px 2px white'
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
