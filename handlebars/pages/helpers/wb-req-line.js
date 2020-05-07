let inputNum = 0;

module.exports = function (obj) {
    var content = obj.fn(this);
    var result = '<div class="P(wbP) Mt(wbMt) Bdw(wbBdw) D(f) Ai(c)">';

    if (content.trim().length) {
        result += `<div class="Fxs(0) Pend(1em)">${content}</div>`;
    }

    // Add a unique name for each form field so wkhtmltopdf picks up the form field
    result += `<input name="i${inputNum++}" class="Fz(22px) Bgc(smbAccBg):h W(100%) Bdw(0)"/></div>`;

    return result;
};
