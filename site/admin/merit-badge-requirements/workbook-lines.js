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
                    this.viewLines(data),
                    m(components.Text, {
                        data: data
                    })
                ]
            );
        }

        viewLines(data) {
            return m("label", [
                "Number of lines: ",
                m("input", {
                    value: data.lines,
                    type: "number",
                    oninput: (e) => {
                        data.lines = +e.target.value;
                    }
                })
            ]);
        }
    };
};
