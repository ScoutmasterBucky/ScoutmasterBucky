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
    const metadata = {};

    if (process.env.SERVE) {
        metadata.liveReload = true;
    }

    metadata.buildDate = new Date().toISOString();
    const meritBadges = require("./merit-badges.json");
    metadata.meritBadges = meritBadges;
    const meta = {
        active: Object.values(meritBadges).filter((x) => x.active)
    };
    meta.activeCount = meta.active.length;
    metadata.meritBadgeMeta = meta;
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

sugar.use(__dirname + '/plugins/workbook-header-footer');

// Generate CSS from HTML using Atomizer.
sugar.use("metalsmith-atomizer", require('./atomizer-config.json'));

sugar.use("metalsmith-redirect", {
    htmlExtensions: ['.htm', '.html'],
    redirections: require("./redirects.json")
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
            "${source}/**/*.gif": true,
            "${source}/**/*.jpg": true,
            "helpers/**/*": "**/*.{html,md,css,js}",
            "layouts/**/*": "**/*.{html,md,css,js}",
            "partials/**/*": "**/*.{html,md,css,js}"
        }
    });
}

sugar.build();
