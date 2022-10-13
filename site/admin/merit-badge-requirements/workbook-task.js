/* global m */

module.exports = function (components) {
    return class WorkbookTask {
        view(vnode) {
            const data = vnode.attrs.data;

            return m('div', {
                class: 'D(f) Fxd(c)'
            }, [
                'Task (Text is optional)',
                m(components.Text, {
                    data: data
                })
            ]);
        }
    };
};
