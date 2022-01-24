const luxon = require('luxon');

module.exports = function (obj) {
    const format = obj.hash.format || 'MMMM d, yyyy';
    const dateStr = obj.fn(this).trim();

    let d;

    if (dateStr.match(/^\d\d\d\d-\d\d-\d\d \d\d?:\d\d$/)) {
        d = luxon.DateTime.fromFormat(dateStr, 'yyyy-MM-dd H:mm', { zone: 'America/Chicago' })
    } else {
        d = luxon.DateTime.fromISO(dateStr, { zone: 'America/Chicago' });
    }

    if (format === 'iso') {
        return d.setZone('utc').toISO();
    }

    return d.toFormat(format)
};
