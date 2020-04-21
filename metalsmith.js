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

// Generate CSS from HTML using Atomizer.
sugar.use("metalsmith-atomizer", {
    acssConfig: {
        breakPoints: {
            // Order matters for rule generation
            l: "@media screen and (max-width: 992px)", // Tablet landscape
            m: "@media screen and (max-width: 768px)", // Tablet portrait, phone landscape
            s: "@media screen and (max-width: 575px)", // Phone portrait,
            p: "@media print"
        },
        custom: {
            smbButtonBackground: "#5b8800",
            smbButtonBarBackground: "#a4c57c",
            smbButtonCaptionText: "black",
            smbButtonText: "white",
            smbEventMeritBadge: "#009933",
            smbEventOnline: "#CC9900",
            smbEventTitleText: "red",
            smbFadedText: "#999999",
            smbGold: "#CC9900",
            smbAccentGold: "#FFFF99",
            smbHeading3Text: "#336600",
            smbHeadingBackground: "#5b8800",
            smbHeadingText: "white",
            smbPageBackground: "black",
            smbPageForeground: "white",
            smbPageSecondaryText: "#719D3E",
            smbAlertText: "red",
            whiteGlow:
                "-2px 0 2px white, 0 -2px 2px white, 2px 0 2px white, 0 2px 2px white"
        }
    },
    addRules: [
        {
            type: "pattern",
            name: "Ba",
            matcher: "Ba",
            allowParamToValue: false,
            shorthand: true,
            styles: {
                "break-after": "$0"
            },
            arguments: [{
                a: "auto",
                av: "avoid",
                alw: "always",
                all: "all",
                ap: "avoid-page",
                p: "page",
                start: "left",
                end: "right",
                ro: "recto",
                vo: "verso",
                ac: "avoid-column",
                c: "column",
                ar: "avoid-region",
                r: "region"
            }]
        },
        {
            type: "pattern",
            name: "Bb",
            matcher: "Bb",
            allowParamToValue: false,
            shorthand: true,
            styles: {
                "break-before": "$0"
            },
            arguments: [{
                a: "auto",
                av: "avoid",
                alw: "always",
                all: "all",
                ap: "avoid-page",
                p: "page",
                start: "left",
                end: "right",
                ro: "recto",
                vo: "verso",
                ac: "avoid-column",
                c: "column",
                ar: "avoid-region",
                r: "region"
            }]
        },
        {
            type: "pattern",
            name: "Bi",
            matcher: "Bi",
            allowParamToValue: false,
            shorthand: true,
            styles: {
                "break-inside": "$0"
            },
            arguments: [{
                a: "auto",
                av: "avoid",
                ap: "avoid-page",
                ac: "avoid-column",
                ar: "avoid-region"
            }]
        },
        {
            type: "pattern",
            name: "Cc",
            matcher: "Cc",
            allowParamToValue: true,
            styles: {
                "column-count": "$0"
            }
        },
        {
            type: "pattern",
            name: "Cf",
            matcher: "Cf",
            allowParamToValue: false,
            shorthand: true,
            styles: {
                "column-fill": "$0"
            },
            arguments: [{
                a: "auto",
                b: "balance"
            }]
        },
        {
            type: "pattern",
            name: "Cg",
            matcher: "Cg",
            styles: {
                "column-gap": "$0"
            }
        },
        {
            type: "pattern",
            id: "Crc",
            name: "Crc",
            matcher: "Crc",
            noParams: false,
            styles: {
                "column-rule-color": "$0"
            }
        },
        {
            type: "pattern",
            name: "Crs",
            matcher: "Crs",
            allowParamToValue: false,
            shorthand: true,
            styles: {
                "column-rule-style": "$0"
            },
            arguments: [{
                d: "dotted",
                da: "dashed",
                do: "double",
                g: "groove",
                h: "hidden",
                i: "inset",
                n: "none",
                o: "outset",
                r: "ridge",
                s: "solid"
            }]
        },
        {
            type: "pattern",
            name: "Crw",
            matcher: "Crw",
            styles: {
                "column-rule-width": "$0"
            }
        },
        {
            type: "pattern",
            name: "Cs",
            matcher: "Cs",
            allowParamToValue: false,
            shorthand: true,
            styles: {
                "column-span": "$0"
            },
            arguments: [{
                a: "all",
                n: "none"
            }]
        },
        {
            type: "pattern",
            name: "Cw",
            matcher: "Cw",
            styles: {
                "column-width": "$0"
            }
        },
        {
            type: "pattern",
            name: "Pba",
            matcher: "Pba",
            allowParamToValue: false,
            shorthand: true,
            styles: {
                "page-break-after": "$0"
            },
            arguments: [{
                a: "auto",
                av: "avoid",
                al: "always",
                left: "left",
                right: "right"
            }]
        },
        {
            type: "pattern",
            name: "Pbb",
            matcher: "Pbb",
            allowParamToValue: false,
            shorthand: true,
            styles: {
                "page-break-before": "$0"
            },
            arguments: [{
                a: "auto",
                av: "avoid",
                al: "always",
                left: "left",
                right: "right"
            }]
        },
        {
            type: "pattern",
            name: "Pbi",
            matcher: "Pbi",
            allowParamToValue: false,
            shorthand: true,
            styles: {
                "page-break-inside": "$0"
            },
            arguments: [{
                a: "auto",
                av: "avoid"
            }]
        }
    ],
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
            "${source}/**/*.gif": true,
            "${source}/**/*.jpg": true,
            "helpers/**/*": "**/*.{html,md,css,js}",
            "layouts/**/*": "**/*.{html,md,css,js}",
            "partials/**/*": "**/*.{html,md,css,js}"
        }
    });
}

sugar.build();
