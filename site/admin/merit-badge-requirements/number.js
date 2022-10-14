/* global m */

module.exports = function () {
    return class Numeric {
        view(vnode) {
            const attrs = vnode.attrs;

            return m("label", [
                `${attrs.label}: `,
                m("input", {
                    type: "number",
                    value: attrs.data[attrs.prop],
                    onblur: (e) => {
                        attrs.data[attrs.prop] = +e.target.value;
                    }
                })
            ]);
        }
    };
};
