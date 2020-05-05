let textAreaNum = 0;

module.exports = function (obj) {
    var height = obj.hash.lines * (22 * 1.2); // 22px font size, 1.2em line height
    var content = obj.fn(this);
    var result = '<div class="P(wbP) Mt(wbMt) Bdw(wbBdw)">';

    if (content.trim().length) {
        result += `<div class="Mb(0.25em) Fz(0.8em)">${content}</div>`;
    }

    // Add a unique name for each form field so wkhtmltopdf picks up the form field
    result += `<textarea name="ta${textAreaNum++}" class="Fz(22px) Bgc(smbAccentGold):h W(100%) Bdw(0) Mih(${height}px) Rsz(v)"></textarea></div>`;

    return result;
};
