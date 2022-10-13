/* global m */

module.exports = function (components) {
    return class Detail {
        view(vnode) {
            const data = vnode.attrs.data;

            return m(
                "div",
                {
                    class: "D(f) Fxd(c)"
                },
                [
                    "Additional Detail",
                    this.viewHideCheckbox(data),
                    m(components.Text, {
                        data: data
                    })
                ]
            );
        }

        viewHideCheckbox(data) {
            return m('label',
            [
                m('input', {
                    type: "checkbox",
                    value: data.workbookHide,
                    onchange: () => {
                        if (data.workbookHide) {
                            delete data.workbookHide;
                        } else {
                            data.workbookHide = true;
                        }
                    }
                }),
                ' Hide additional detail from workbook'
            ]);
        }
    };
};
