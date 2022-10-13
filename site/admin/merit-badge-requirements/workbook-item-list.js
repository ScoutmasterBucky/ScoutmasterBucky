/* global m */

const arrayFunctions = require("./array-functions");

module.exports = function (components) {
    return class WorkbookItemList {
        view(vnode) {
            const data = vnode.attrs.data || [];

            if (data.length === 0) {
                return this.viewItem(null, null, data);
            }

            return data.map((item, index) => this.viewItem(item, index, data));
        }

        viewItem(item, index, data) {
            return m(
                "div",
                {
                    class: "D(f) Fxd(c) Bgc(lightblue) My(1em)"
                },
                [
                    m("div", { class: "W(100%)" }, this.viewContent(item)),
                    this.viewControls(index, data)
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
                    label: "+Area",
                    onclick: () => {
                        arrayFunctions.insertAfter(data, index, {
                            area: true
                        });
                    }
                })
            );

            buttons.push(
                m(components.Button, {
                    label: "+Grid",
                    onclick: () => {
                        arrayFunctions.insertAfter(data, index, {
                            grid: 10
                        });
                    }
                })
            );

            buttons.push(
                m(components.Button, {
                    label: "+Header",
                    onclick: () => {
                        arrayFunctions.insertAfter(data, index, {
                            header: true,
                            text: "Header text"
                        });
                    }
                })
            );

            buttons.push(
                m(components.Button, {
                    label: "+Lines",
                    onclick: () => {
                        arrayFunctions.insertAfter(data, index, {
                            lines: 10
                        });
                    }
                })
            );

            buttons.push(
                m(components.Button, {
                    label: "+Raw",
                    onclick: () => {
                        arrayFunctions.insertAfter(data, index, {
                            raw: true,
                            text: "Raw content"
                        });
                    }
                })
            );

            buttons.push(
                m(components.Button, {
                    label: "+Signature",
                    onclick: () => {
                        arrayFunctions.insertAfter(data, index, {
                            signature: "Adult Scout Leader"
                        });
                    }
                })
            );

            buttons.push(
                m(components.Button, {
                    label: "+Split",
                    onclick: () => {
                        arrayFunctions.insertAfter(data, index, {
                            split: []
                        });
                    }
                })
            );

            buttons.push(
                m(components.Button, {
                    label: "+Task",
                    onclick: () => {
                        arrayFunctions.insertAfter(data, index, {
                            task: true
                        });
                    }
                })
            );

            return m(
                "div",
                {
                    class: "D(f)"
                },
                buttons
            );
        }

        viewContent(item) {
            if (item === null) {
                return [];
            }

            if (item.area) {
                return m(components.WorkbookArea, {
                    data: item
                });
            }

            if (item.grid) {
                return m(components.WorkbookGrid, {
                    data: item
                });
            }

            if (item.header) {
                return m(components.WorkbookHeader, {
                    data: item
                });
            }

            if (item.lines) {
                return m(components.WorkbookLines, {
                    data: item
                });
            }

            if (item.raw) {
                return m(components.WorkbookRaw, {
                    data: item
                });
            }

            if (item.signature) {
                return m(components.WorkbookSignature, {
                    data: item
                });
            }

            if (item.split) {
                return m(components.WorkbookSplit, {
                    data: item
                });
            }

            if (item.task) {
                return m(components.WorkbookTask, {
                    data: item
                });
            }

            console.error(item);

            return m(
                "span",
                {
                    class: "C(red)"
                },
                "Invalid item in workbook item list"
            );
        }
    };
};
