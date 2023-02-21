module.exports = function (obj) {
    const figureContent = obj.fn(this);
    const normalContent = obj.inverse(this);
    const alignLeft = obj.hash.align === "left";
    const align = alignLeft ? "Fl(start)--_s" : "Fl(end)--_s";
    const positionTop = obj.hash.position === "top";
    const position = positionTop ? "Fxd(c)--s" : "Fxd(cre)--s";

    return `<div class="D(f)--s Ai(c)--s ${position}">
    <div class="D(f) Fxd(c) ${align} Fxs(0) W(20%)--_sml W(25%)--l W(33%)--m W(50%)--s Px(0.8em) Py(0.4em) Ai(c)">
        ${figureContent}
    </div>
    <div>
        ${normalContent}
    </div>
</div>`;
};
