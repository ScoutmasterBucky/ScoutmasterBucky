/* global m */

const arrayFunctions = require("./array-functions");

module.exports = function (components) {
    return class Note {
        view(vnode) {
            const data = vnode.attrs.data;

            return m(
                "div",
                {
                    class: "D(f) Fxd(c)"
                },
                [
                    this.viewNoteTypes(data),
                    m(components.Text, {
                        data: data
                    })
                ]
            );
        }

        viewNoteTypes(data) {
            return m(
                "div",
                {
                    class: "D(f)"
                },
                [
                    "Note types: ",
                    m(
                        "div",
                        {
                            class: "D(f) Fxd(c) Pstart(2em)"
                        },
                        [
                            this.viewCheckbox(data, "online"),
                            this.viewCheckbox(data, "inPerson"),
                            this.viewCheckbox(data, "counselor")
                        ]
                    )
                ]
            );
        }

        viewCheckbox(data, noteType) {
            return m("label", [
                m("input", {
                    type: "checkbox",
                    checked: data.note.includes(noteType),
                    onchange: () => {
                        if (data.note.includes(noteType)) {
                            arrayFunctions.removeValue(data.note, noteType);
                        } else {
                            data.note.push(noteType);
                        }
                    }
                }),
                ` ${noteType}`
            ]);
        }
    };
};
