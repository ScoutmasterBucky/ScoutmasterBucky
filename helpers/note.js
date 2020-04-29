var marked = require('marked');

module.exports = function(obj) {
    const notesTypes = [obj.hash.type];

    if (obj.hash.type2) {
        notesTypes.push(obj.hash.type2);
    }

    const notesToggles = notesTypes
        .map((x) => `notesToggles-${x}_D(b)`)
        .join(" ");

    // One line so it can be used within requirements
    return `<div class="C(smbAlertText) Fw(b) Fs(i) D(n) Pb(smbReqP) ${notesToggles}">${marked(obj.fn(this))}</div>`;
};
