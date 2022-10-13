/* global m */

module.exports = function (components) {
    return class WorkbookRaw {
        view(vnode) {
            const data = vnode.attrs.data;

            return m('div', {
                class: 'D(f) Fxd(c)'
            }, [
                'Raw HTML',
                m(components.Text, {
                    data: data
                })
            ]);
        }
    };
};
