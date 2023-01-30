module.exports = function (obj) {
    return `<div class="Mt(1em) Bdw(wbBdw) Bki(av) Pgbi(av) Lh(wbLh) Bgc(smbAccBg) ${obj.hash.class || ''}">${obj.fn(this)}</div>`;
};
