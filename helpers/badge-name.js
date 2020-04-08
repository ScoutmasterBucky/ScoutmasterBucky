const badges = require('../badges.json');

module.exports = function (obj) {
    const from = obj.hash.badge;

    if (from in badges) {
        return badges[from];
    }

    return 'Unknown:' + from;
};
