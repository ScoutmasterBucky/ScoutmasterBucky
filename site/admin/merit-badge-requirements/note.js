/* global m */

module.exports = function () {
    return class Note {
        view(vnode) {
            const data = vnode.attrs.data;
            console.log(data);

            return m('div', 'note');
        }
    };
};
