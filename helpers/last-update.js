module.exports = function () {
    const d = new Date();
    const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][d.getMonth()];

    return month + ' ' + d.getDate() + ', ' + d.getFullYear();
};
