/* global m */

module.exports = function () {
    return class WorkbookSignature {
        view(vnode) {
            const data = vnode.attrs.data;
            console.log(data);

            return m('div', 'workbook-signature');
        }
    };
};
