module.exports = function (obj) {
    const content = obj.fn(this);

    return `<div class="W(20%)--_sml W(25%)--l W(33%)--m W(50%)--s D(f) Fxd(c) Ai(c) P(4px)">${content}</div>`;
};
