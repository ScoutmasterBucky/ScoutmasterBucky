module.exports = function (obj) {
    var content = obj.fn(this);
    var result = `<div class="Mt(wbMt) Bdw(wbBdw) Bi(av) Pbi(av) Lh(wbLh) ${obj.hash.class || ''}">${content}</div>`;

    return result;
};
