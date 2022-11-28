module.exports = function (obj) {
    var content = obj.fn(this);
    var result = `<div class="Ta(c) D(ib) W(##WIDTH##) ${obj.hash.class} Bdendw(wbBdw)">${content}</div>`;

    return result;
};
