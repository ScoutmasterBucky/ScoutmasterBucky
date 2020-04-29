const pluginKit = require('metalsmith-plugin-kit');

function start(f) {
    return `<!DOCTYPE html>
<html lang="es" class="M(0) P(0)">
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <!-- Do not include reset.css - it messes up the print headers by adding 100% width to html and body -->
        <link rel="stylesheet" href="${f.rootPath}atomic.css" />
        <link rel="stylesheet" href="${f.rootPath}site.css" />
        <title>Scoutmaster Bucky ${f.meritBadges[f.badge].name} Merit Badge Workbook</title>
    </head>
    <body class="M(0) P(0)">
`;
}

function end(f) {
    return `
    </body>
</html>`;
}

function makeHeader(f) {
    return start(f) + `
        <div class="D(tb) W(100%)">
            <div class="D(tbc) W(30%) Va(m)">
                <img src="${f.rootPath}${f.meritBadges[f.badge].bucky}" class="H(1in) W(a)" />
            </div>
            <div class="D(tbc) W(70%) Va(m) Ta(c)">
                <div class="Ta(c) C(smbButtonBackground) Fz(1.2em) Fs(i) Fw(b)">Scoutmaster Bucky</div>
                <div class="Ta(c) Tt(u) Fz(1.2em) Fw(b)">${f.meritBadges[f.badge].name}</div>
                <div class="Ta(c) C(smbButtonBackground) Fz(1.2em) Fs(i) Fw(b)">Merit Badge Workbook</div>
                <div class="Ta(c) C(blue)">www.ScoutmasterBucky.com</div>
            </div>
        </div>` + end(f);
}

function makeFooter(f) {
    return start(f) + `
        <table border="0" width="100%" class="Fz(0.8em)">
            <tr>
                <td>Scoutmaster Bucky ${f.meritBadges[f.badge].name} Merit Badge Workbook<br><a href="https://scoutmasterbucky.com">https://ScoutmasterBucky.com</a></td>
                <td align="right">
                <script>
var qs = document.location.href.split('?')[1],
    p = qs.match(/(^|&)page=([^&]*)/)[2],
    t = qs.match(/(^|&)page=([^&]*)/)[2];
document.write('Page ' + p + ' of ' + t);
                </script>
                <br>${f.year} Scouts BSA Requirements</td>
            </tr>
        </table>` + end(f);
}

function workbookInfo(fn, f) {
    return {
        badge: f.badge,
        name: f.meritBadges[f.badge].name,
        path: fn.replace(/\/index.html$/, '/')
    };
}

module.exports = function workbookHeaderFooter() {
    let workbooks = [];

    return pluginKit.middleware({
        before: function () {
            workbooks = [];
        },
        each: function (filename, fileObject, files) {
            if (fileObject.workbook) {
                workbooks.push(workbookInfo(filename, fileObject));
                const headerFilename = filename.replace('index.html', 'header.html');
                const footerFilename = filename.replace('index.html', 'footer.html');
                pluginKit.addFile(files, headerFilename, makeHeader(fileObject));
                pluginKit.addFile(files, footerFilename, makeFooter(fileObject));
            }
        },
        after: function (files) {
            pluginKit.addFile(files, 'workbooks.json', JSON.stringify(workbooks, null, 4));
        }
    });
};
