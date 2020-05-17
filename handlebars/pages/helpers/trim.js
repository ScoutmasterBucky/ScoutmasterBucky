// This is a helper only because including a partial automatically adds a newline.
module.exports = function (obj) {
    return obj.fn(this).trim();
};
