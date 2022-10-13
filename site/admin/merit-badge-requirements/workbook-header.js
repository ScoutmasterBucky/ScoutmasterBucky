/* global m */

module.exports = function (components) {
    return class WorkbookHeader {
        view(vnode) {
            const data = vnode.attrs.data;

            return m('div', {
                class: 'D(f) Fxd(c)'
            }, [
                'Header',
                m(components.Text, {
                    data: data
                })
            ]);
        }
    };
};
