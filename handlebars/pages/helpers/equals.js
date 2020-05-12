module.exports = function(a, b, obj) {
    if (arguments.length != 3) {
        throw new Exception("'equals' requires exactly two arguments");
    }

    if (typeof a === 'function') {
        a = a.call(this);
    }

    if (typeof b === 'function') {
        b = b.call(this);
    }

    return a === b;
};
