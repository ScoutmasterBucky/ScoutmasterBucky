/* global m */

module.exports = function () {
    return class Detail {
        view(vnode) {
            const data = vnode.attrs.data;
            console.log(data);

            return m('div', 'detail');
        }
    };
};
