module.exports = function (obj) {
    if (typeof obj.hash.json === 'undefined') {
        return JSON.stringify(null);
    }

    return JSON.stringify(obj.hash.json);
};
