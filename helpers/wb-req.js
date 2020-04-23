module.exports = function(obj) {
    return `
<div class="Bi(av) Pbi(av) Lh(wbLh)">
<div class="Mt(1em) Bgc(smbButtonBarBackground) Bdw(wbBdw) P(wbP) D(f)">
<div class="W(20%) Fw(b) Tt(u)">Requirement ${obj.hash.item}:</div>
<div class="W(80%)">${obj.hash.requirement}</div>
</div>
${obj.fn(this)}
</div>
`;
};
