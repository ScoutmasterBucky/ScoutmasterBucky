module.exports = function(obj) {
    let result = '<div class="Bki(av) Pgbi(av) Lh(wbLh)">';

    if (obj.hash.alert) {
        result += `<div class="Tt(u) Mt(1em) Bgc(--accentBackground) Bdc(red) Bdw(0.25em) P(1em)--_s P(0.5em)--s Fw(b) C(red)">${obj.hash.alert}</div>`;
    }

    result += `
<div class="Mt(1em) Bgc(--heading2Background) Bdw(wbBdw) P(wbP)">
<div><span class="Fw(b) Tt(u)">Requirement ${obj.hash.item}:</span> ${obj.hash.requirement}</div>
</div>
${obj.fn(this)}
</div>
`;

    return result;
};
