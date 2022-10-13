/* global m */

module.exports = function () {
    return class WorkbookSignature {
        view(vnode) {
            const data = vnode.attrs.data;

            return m(
                "div",
                {
                    class: "D(f) Fxd(c)"
                },
                ["Signature", this.viewSignature(data), this.viewCheckbox(data)]
            );
        }

        viewSignature(data) {
            return m("label", [
                "Who needs to sign: ",
                m("input", {
                    type: "text",
                    value: data.signature,
                    oninput: (e) => {
                        data.signature = e.target.value;
                    }
                })
            ]);
        }

        viewCheckbox(data) {
            return m("label", [
                'Checkbox label (optional, defaults to "Approved"): ',
                m("input", {
                    type: "text",
                    value: data.checkbox,
                    oninput: (e) => {
                        data.checkbox = e.target.value;
                    }
                })
            ]);
        }
    };
};
