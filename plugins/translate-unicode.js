const pluginKit = require('metalsmith-plugin-kit');

module.exports = function translateUnicode() {
    return pluginKit.middleware({
        match: '**/*.md',
        each: function (filename, fileObject) {
            let contents = fileObject.contents.toString();
            contents = contents.replace(/—/g, '–'); // en-dash to em-dash
            contents = contents.replace(/ - /g, '–'); // hyphen to trimmed em-dash
            contents = contents.replace(/– /g, '–'); // em-dash trimming
            contents = contents.replace(/ –/g, '–'); // em-dash trimming
            contents = contents.replace(/–/g, ' – '); // em-dash spacing correction
            contents = contents.replace(/[“”]/g, '"'); // Smart quotes to normal quotes. This helps with copy and paste with some editors.
            fileObject.contents = Buffer.from(contents, 'utf8');
        }
    });
};
