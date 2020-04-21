module.exports = function(obj) {
    return (
        '<div class="Mt(1em) Bgc(smbButtonBarBackground) Bdw(1pt) P(0.25em) D(f) Bi(av)">' +
        `<div class="W(20%) Fw(b) Tt(u)">Requirement ${obj.hash.item}:</div>` +
        '<div class="W(80%)">' +
        obj.fn(this) +
        "</div></div>"
    );
};
