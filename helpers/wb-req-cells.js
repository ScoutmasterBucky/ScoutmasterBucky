module.exports = function (obj) {
    var content = obj.fn(this).split('##WIDTH##');
    var cells = content.length - 1;
    var width = Math.floor(1000 / cells) / 10;
    content = content.join(width + '%').replace(/>\s*/g, '>');
    var result = `<div class="Mt(wbMt) Bdtw(wbBdw) Bdbw(wbBdw) Bdstartw(wbBdw)">${content}</div>`;

    return result;
};
