const moment = require('moment-timezone');
moment.tz.setDefault('CST6CDT');

module.exports = function(options) {
    let content = options.fn(this);

    if (content.length === 4) {
        return content;
    }

    const m = moment(content)

    if (content.length === 7) {
        return m.format('MMMM, YYYY');
    }

    return m.format('MMMM D, YYYY');
};
