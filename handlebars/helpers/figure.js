module.exports = function (obj) {
    const content = obj.fn(this);
    const alignLeft = obj.hash.align === "left";
    const align = alignLeft ? "Fl(start)" : "Fl(end)";

    return `<div class="D(f) Fxd(c) ${align} W(20%)--_sml W(25%)--l W(33%)--m W(50%)--s Px(0.8em) Py(0.4em) Ai(c)">
    ${content}
</div>`;
};
