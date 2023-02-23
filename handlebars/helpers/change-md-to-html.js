module.exports = function (obj) {
    const md = obj.fn(this);

    if (md.match(/(^|\/)index.md$/)) {
        return md.replace(/index.md$/, '');
    }

    return md.replace(/md$/, 'html');
};
