/* global m */

module.exports = function () {
    return class WorkbookTask {
        view(vnode) {
            const data = vnode.attrs.data;
            console.log(data);

            return m('div', 'workbook-task');
        }
    };
};
