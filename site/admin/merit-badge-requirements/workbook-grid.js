/* global m */

module.exports = function (components) {
    return class WorkbookGrid {
        view(vnode) {
            const data = vnode.attrs.data;

            return m(
                "div",
                {
                    class: "D(f) Fxd(c)"
                },
                [
                    "Gridded Area (Text is optional)",
                    m(components.Numeric, {
                        data,
                        label: "Number of lines (vertically)",
                        prop: "grid"
                    }),
                    m(components.Text, {
                        data: data
                    })
                ]
            );
        }
    };
};
