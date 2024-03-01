module.exports = function (obj) {
    const figureContent = obj.fn(this);
    const normalContent = obj.inverse(this);
    const alignLeft = obj.hash.align === "left";
    const align = alignLeft ? "Fxd(r)--_s" : "Fxd(rre)--_s";
    const positionTop = obj.hash.position === "top";
    const position = positionTop ? "Fxd(c)--s" : "Fxd(cre)--s";

    return `<div class="D(f) Ai(c)--s ${position} ${align}">
    <div class="D(f) Fxd(c) Fxs(0) W(20%)--_sml W(25%)--l W(33%)--m W(50%)--s Px(0.8em) Py(0.4em) Ai(c)">
        ${figureContent}
    </div>
    <div>
        ${normalContent}
    </div>
</div>
<div class="Cl(b)"></div>`; // The last line is a clearfix for the floating element
};
