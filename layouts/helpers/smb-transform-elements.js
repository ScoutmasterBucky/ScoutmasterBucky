module.exports = function (options) {
    let content = options.fn(this);

    content = content.replace(/(<h1 id="[^"]*")>/g, (ignore, match) => match + ' class="Bgc(smbHeadingBackground) C(smbHeadingText) Px(10px) Py(6px) Tt(u) My(0.6em) Fz(2em) Fz(1.4em)--s notesToggles-online_Bgc(smbGold)">');
    content = content.replace(/(<h2 id="[^"]*")>/g, (ignore, match) => match + ' class="Mt(0.9em) Mb(0.5em) Bgc(smbHeadingBackground) C(smbHeadingText) Px(10px) Py(6px) Tt(u) Fz(1.5em) Fz(1.2em)--si notesToggles-online_Bgc(smbGold)">');
    content = content.replace(/(<h3 id="[^"]*")>/g, (ignore, match) => match + ' class="C(smbHeading3Text) Tt(u) D(f) Fz(16px) Fw(b) Jc(c) Mx(a) Py(1em) Bdtw(1px) Bdbw(1px) W(95%) Bdc(smbHeading3Text) My(1em)">');

    return content;
};
