/* global m */

module.exports = function (components) {
    return class WorkbookGrid {
        view(vnode) {
            const data = vnode.attrs.data;

            return m('div', {
                class: 'D(f) Fxd(c)'
            }, ['Gridded Area (Text is optional)',
                    this.viewLines(data),
                    m(components.Text, {
                        data: data
                    })
            ]);
        }

        viewLines(data) {
            return m("label", [
                "Number of lines (vertically): ",
                m("input", {
                    value: data.grid,
                    type: "number",
                    oninput: (e) => {
                        data.grid = +e.target.value;
                    }
                })
            ]);
        }
    };
};
