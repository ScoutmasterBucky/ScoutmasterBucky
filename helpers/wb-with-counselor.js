module.exports = function (obj) {
    var content = obj.fn(this);
    var result = '<div class="Mt(wbMt) Bdw(wbBdw) Bi(av) Pbi(av) Lh(wbLh) P(1em) Ta(c)">' +
        '<div>Be sure to review the merit badge pamphlet for preparation information on this requirement.</div>' +
        '<div class="C(red) Mt(1em) Fw(b) Fz(1.2em)">This requirement component must be done with your merit badge counselor</div>';

    if (content.trim()) {
        result += `<div class="Mt(1em)">${content}</div>`;
    }

    result += '</div>';

    return result;
};
