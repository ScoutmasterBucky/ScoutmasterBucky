module.exports = function (options) {
    let content = options.fn(this);

    content = content.replace(/(<h1 id="[^"]*")>/g, (ignore, match) => match + ' class="Bgc(smbHeadingBackground) C(smbHeadingText) Px(10px) Py(6px) Tt(u)">');
    content = content.replace(/(<h2 id="[^"]*")>/g, (ignore, match) => match + ' class="Mt(0.7em) Bgc(smbHeadingBackground) C(smbHeadingText) Px(10px) Py(6px) Tt(u)">');

    return content;
};
