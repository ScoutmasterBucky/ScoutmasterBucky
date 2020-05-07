module.exports = function(obj) {
    let result = '<div class="Bi(av) Pbi(av) Lh(wbLh)">';

    if (obj.hash.alert) {
        result += `<div class="Tt(u) Mt(1em) Bgc(smbAccBg) Bdc(red) Bdw(0.25em) P(1em) P(0.5em)--s Fw(b) C(red)">${obj.hash.alert}</div>`;
    }

    result += `
<div class="Mt(1em) Bgc(smbHd2Bg) Bdw(wbBdw) P(wbP)">
<div><span class="Fw(b) Tt(u)">Requirement ${obj.hash.item}:</span> ${obj.hash.requirement}</div>
</div>
${obj.fn(this)}
</div>
`;

    return result;
};
