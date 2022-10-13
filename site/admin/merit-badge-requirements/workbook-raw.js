/* global m */

module.exports = function () {
    return class WorkbookRaw {
        view(vnode) {
            const data = vnode.attrs.data;
            console.log(data);

            return m('div', 'workbook-raw');
        }
    };
};
