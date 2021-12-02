const monthNames = [
    null, 'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

module.exports = function(options) {
    const content = options.fn(this);
    const parts = content.split('-');

    // YYYY
    if (parts.length === 1) {
        return parts[0];
    }

    parts[1] = monthNames[parts[1]];

    if (parts.length === 2) {
        return `${parts[1]} ${parts[0]}`;
    }

    return `${parts[1]} ${parts[2]}, ${parts[0]}`;
};
