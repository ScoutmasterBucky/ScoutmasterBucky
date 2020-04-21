module.exports = function(obj) {
    const notesTypes = [obj.hash.type];

    if (obj.hash.type2) {
        notesTypes.push(obj.hash.type2);
    }

    const notesToggles = notesTypes
        .map((x) => `notesToggles-${x}_D(b)`)
        .join(" ");

    return (
        '<div class="C(smbAlertText) Fw(b) Fs(i) D(n) ' +
        notesToggles +
        '">' +
        obj.fn(this) +
        "</div>"
    );
};
