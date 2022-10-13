/* global m */

module.exports = function () {
    return class Callout {
        view(vnode) {
            const data = vnode.attrs.data;
            console.log(data);

            return m('div', 'callout');
        }
    };
};
