/* global m */

const arrayFunctions = require("./array-functions");

module.exports = function (components) {
    return class RequirementList {
        view(vnode) {
            const data = vnode.attrs.data || [];

            if (data.length === 0) {
                return this.viewItem(null, null, []);
            }

            return data.map((item, index) => this.viewItem(item, index, data));
        }

        viewItem(item, index, data) {
            return m(
                "div",
                {
                    class: "D(f) Bdw(1px) Bdc(gray) My(1em)"
                },
                [
                    this.viewControls(index, data),
                    m(
                        "div",
                        {
                            class: "W(100%)"
                        },
                        this.viewContent(item)
                    )
                ]
            );
        }

        viewControls(index, data) {
            const buttons = [];

            if (index !== null) {
                buttons.push(
                    m(components.Button, {
                        disabled: index === 0,
                        class: "Fz(1.2em)",
                        label: "▲",
                        onclick: () => {
                            arrayFunctions.swap(data, index, index - 1);
                        }
                    })
                );
                buttons.push(
                    m(components.Button, {
                        label: "❌",
                        onclick: () => {
                            arrayFunctions.remove(data, index);
                        }
                    })
                );
                buttons.push(
                    m(components.Button, {
                        disabled: index === data.length - 1,
                        class: "Fz(1.2em)",
                        label: "▼",
                        onclick: () => {
                            arrayFunctions.swap(data, index, index + 1);
                        }
                    })
                );
            }

            buttons.push(
                m(components.Button, {
                    label: "+Req",
                    onclick: () => {
                        arrayFunctions.insertAfter(data, index, {
                            requirement: "?",
                            text: "Requirement text"
                        });
                    }
                })
            );

            buttons.push(
                m(components.Button, {
                    label: "+Note",
                    onclick: () => {
                        arrayFunctions.insertAfter(data, index, {
                            note: ["online", "inPerson"],
                            text: "Note text"
                        });
                    }
                })
            );

            buttons.push(
                m(components.Button, {
                    label: "+Call",
                    onclick: () => {
                        arrayFunctions.insertAfter(data, index, {
                            callout: true,
                            text: "Callout text"
                        });
                    }
                })
            );

            buttons.push(
                m(components.Button, {
                    class: "P(5px)",
                    label: "+Det",
                    onclick: () => {
                        arrayFunctions.insertAfter(data, index, {
                            detail: true,
                            text: "Detail text"
                        });
                    }
                })
            );

            return m(
                "div",
                {
                    class: "D(f) Fxd(c) Pend(1em)"
                },
                buttons
            );
        }

        viewContent(item) {
            if (item === null) {
                return [];
            }

            if (item.requirement) {
                return m(components.Requirement, {
                    data: item
                });
            }

            if (item.note) {
                return m(components.Note, {
                    data: item
                });
            }

            if (item.callout) {
                return m(components.Callout, {
                    data: item
                });
            }

            if (item.detail) {
                return m(components.Detail, {
                    data: item
                });
            }

            console.error(item);

            return m(
                "span",
                {
                    class: "C(red)"
                },
                "Invalid item in requirement list"
            );
        }
    };
};
