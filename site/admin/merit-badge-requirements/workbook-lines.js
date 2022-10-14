/* global m */

module.exports = function (components) {
    return class WorkbookLines {
        view(vnode) {
            const data = vnode.attrs.data;

            return m(
                "div",
                {
                    class: "D(f) Fxd(c)"
                },
                [
                    "Lined Area (Text is optional)",
                    m(components.Numeric, {
                        data,
                        label: "Number of lines",
                        prop: "lines"
                    }),
                    m(components.Text, {
                        data: data
                    })
                ]
            );
        }
    };
};
