const moment = require('moment-timezone');
moment.tz.setDefault('CST6CDT');

module.exports = function (obj) {
    const format = obj.hash.format || 'MMMM D, YYYY';
    const dateStr = obj.fn(this);
    const m = moment(dateStr).tz("CST6CDT");
    return m.format(format);
};
