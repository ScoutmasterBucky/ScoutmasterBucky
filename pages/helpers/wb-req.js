module.exports = function(obj) {
    let result = '<div class="Bi(av) Pbi(av) Lh(wbLh)">';

    if (obj.hash.alert) {
        result += `<div class="Tt(u) Mt(1em) Bgc(smbAccentGold) Bdc(red) Bdw(0.25em) P(1em) P(0.5em)--s Fw(b) C(red)">${obj.hash.alert}</div>`;
    }

    result += `
<div class="Mt(1em) Bgc(smbButtonBarBackground) Bdw(wbBdw) P(wbP) D(f)">
<div class="W(20%) Fw(b) Tt(u)">Requirement ${obj.hash.item}:</div>
<div class="W(80%)">${obj.hash.requirement}</div>
</div>
${obj.fn(this)}
</div>
`;

    return result;
};
