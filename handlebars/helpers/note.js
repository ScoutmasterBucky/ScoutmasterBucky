var marked = require('marked');

module.exports = function(obj) {
    const notesTypes = [];

    if (obj.hash.type) {
        notesTypes.push(obj.hash.type);
    }

    if (obj.hash.type2) {
        notesTypes.push(obj.hash.type2);
    }

    let notesToggles = '';

    if (notesTypes.length) {
        notesToggles = 'D(n) ' + notesTypes
            .map((x) => `notesToggles-${x}_D(b)`)
            .join(" ");
    }

    let content = marked.parse(obj.fn(this));

    // Force content to be on one line so it can be used within requirements
    content = content.replace(/\n/g, ' ');

    // One line so it can be used within requirements
    return `<div class="C(red) Fw(b) Fs(i) Pb(smbReqP) ${notesToggles}">${content}</div>`;
};
