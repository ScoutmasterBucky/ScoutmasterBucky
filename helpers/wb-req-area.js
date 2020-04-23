module.exports = function (obj) {
    var content = obj.fn(this);
    var result = `<div class="Mt(wbMt) Bdw(wbBdw) ${obj.hash.class || ''}">${content}</div>`;

    return result;
};
