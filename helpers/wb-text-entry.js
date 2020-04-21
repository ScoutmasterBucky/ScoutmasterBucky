let textAreaNum = 0;

module.exports = function (obj) {
    var height = obj.hash.lines * (22 * 1.2); // 22px font size, 1.2em line height
    var content = obj.fn(this);
    var result = '<div class="P(0.25em) Bdstartw(1pt) Bdendw(1pt) Bdbw(1pt) Bi(av) Pbi(av) Lh(1.2em)">';

    if (content.trim().length) {
        result += `<div class="Mb(0.25em)">${content}</div>`;
    }

    result += `<textarea name="ta${textAreaNum++}" class="Fz(22px) Bgc(smbAccentGold):h W(100%) Bdw(0) Mih(${height}px) Rsz(v)" oninput="this.style.height='';this.style.height=this.scrollHeight + 'px'"></textarea></div>`;

    return result;
};
