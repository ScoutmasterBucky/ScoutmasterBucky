const luxon = require('luxon');

module.exports = function (obj) {
    const format = obj.hash.format || 'MMMM d, yyyy';
    const dateStr = obj.fn(this);
    const d = luxon.DateTime.fromFormat(dateStr, 'yyyy-MM-dd H:mm', { zome: 'America/Chicago' })

    if (format === 'iso') {
        return d.toISO();
    }

    return d.toFormat(format)
};
