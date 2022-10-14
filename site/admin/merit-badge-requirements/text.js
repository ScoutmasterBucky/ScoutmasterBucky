/* global m */

module.exports = function () {
    return class Text {
        view(vnode) {
            const data = vnode.attrs.data;

            return m(
                "div",
                {
                    class: "D(f) Fxd(c)"
                },
                [
                    m("label", [
                        m("input", {
                            type: "checkbox",
                            checked: data.markdown,
                            onchange: () => {
                                if (data.markdown) {
                                    delete data.markdown;
                                } else {
                                    data.markdown = true;
                                }
                            }
                        }),
                        " This uses markdown"
                    ]),
                    m("textarea", {
                        class: "W(100%) H(5em) Fz(1em)",
                        value: data.text,
                        onblur: (e) => {
                            data.text = e.target.value.trim();
                        }
                    })
                ]
            );
        }
    };
};
