module.exports = function (options) {
    let content = options.fn(this);
    const section = options.hash.section;

    content = content.replace(
        /(<h1 id="[^"]*")>/g,
        (ignore, match) =>
            match +
            ` class="Bgc(${section}HdBg) C(${section}HdTx) Px(10px) Py(6px) Tt(u) My(0.6em) Fz(2em)--_s Fz(1.4em)--s notesToggles-online_Bgc(${section}TabBg) Cl(b)">`
    );
    content = content.replace(
        /(<h2 id="[^"]*")>/g,
        (ignore, match) =>
            match +
            ` class="Mt(0.9em) Mb(0.5em) Bgc(${section}HdBg) C(${section}Hd2Tx) Px(10px) Py(6px) Tt(u) Fz(1.5em)--_s Fz(1.2em)--s notesToggles-online_Bgc(${section}TabBg) Cl(b)">`
    );
    content = content.replace(
        /(<h3 id="[^"]*")>/g,
        (ignore, match) =>
            match +
            ` class="C(${section}ThmTx) Tt(u) D(f) Fz(16px) Fw(b) Jc(c) Mx(a) Py(1em) Bdtw(1px) Bdbw(1px) W(95%) Bdc(${section}ThmBd) My(1em) Cl(b)">`
    );

    return content;
};
