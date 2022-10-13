/* global m */

module.exports = function () {
    return class Button {
        view(vnode) {
            const attrs = vnode.attrs;

            return m('button', {
                disabled: attrs.disabled,
                onclick: attrs.onclick,
                class: `P(5px) ${attrs.class} Bgc(lightgray):h`
            }, attrs.label);
        }
    };
};
