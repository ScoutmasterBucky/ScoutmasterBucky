/* global m */

module.exports = function (components) {
    return class WorkbookSplit {
        view(vnode) {
            const data = vnode.attrs.data;

            return m(
                "div",
                {
                    class: "D(f) Fxd(c)"
                },
                [
                    "Split Line (Vertically)",
                    m(
                        "div",
                        {
                            class: "Bdw(4px) Bdc(yellow)"
                        },
                        m(components.WorkbookItemList, {
                            data: data.split
                        })
                    )
                ]
            );
        }
    };
};
