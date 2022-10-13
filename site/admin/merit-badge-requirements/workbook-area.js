/* global m */

module.exports = function (components) {
    return class WorkbookArea {
        view(vnode) {
            const data = vnode.attrs.data;

            return m('div', {
                class: 'D(f) Fxd(c)'
            }, [
                'Empty Area (Text is optional)',
                m(components.Text, {
                    data: data
                })
            ]);
        }
    };
};
