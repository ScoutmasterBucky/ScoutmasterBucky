/* global m */

module.exports = function (components) {
    return class Callout {
        view(vnode) {
            const data = vnode.attrs.data;

            return m('div', {
                class: 'D(f) Fxd(c)'
            }, [
                'Callout',
                m(components.Text, {
                    data: data
                })
            ]);
        }
    };
};
