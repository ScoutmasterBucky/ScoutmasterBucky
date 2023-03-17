module.exports = function (options) {
    let content = options.fn(this);

    content = content.replace(
        /(<h1 id="[^"]*")>/g,
        (ignore, match) =>
            match +
            ` class="Bgc(--headingBackground) C(--headingText) Px(10px) Py(6px) Tt(u) My(0.6em) Fz(2em)--_s Fz(1.4em)--s Cl(b)">`
    );
    content = content.replace(
        /(<h2 id="[^"]*")>/g,
        (ignore, match) =>
            match +
            ` class="Mt(0.9em) Mb(0.5em) Bgc(--headingBackground) C(--heading2Text) Px(10px) Py(6px) Tt(u) Fz(1.5em)--_s Fz(1.2em)--s Cl(b)">`
    );
    content = content.replace(
        /(<h3 id="[^"]*")>/g,
        (ignore, match) =>
            match +
            ` class="C(--themeText) Tt(u) D(f) Fz(16px) Fw(b) Jc(c) Mx(a) Py(1em) Bdtw(1px) Bdbw(1px) W(95%) Bdc(--themeBorder) My(1em) Cl(b)">`
    );

    return content;
};
