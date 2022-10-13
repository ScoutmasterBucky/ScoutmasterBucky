/* global m */

module.exports = function (components) {
    return class Requirement {
        view(vnode) {
            const data = vnode.attrs.data;

            return [
                this.viewRequirement(data),
                this.viewText(data),
                this.viewWorkbookHide(data),
                this.viewWorkbook(data),
                this.viewChildren(data)
            ];
        }

        viewRequirement(data) {
            return m("div", [
                "Requirement ",
                m("input", {
                    value: data.requirement,
                    class: "W(5em)"
                })
            ]);
        }

        viewText(data) {
            return m(components.Text, {
                data: data
            });
        }

        viewWorkbookHide(data) {
            return m("label", [
                m("input", {
                    type: "checkbox",
                    value: data.workbookHide,
                    onclick: () => {
                        if (data.workbookHide) {
                            delete data.workbookHide;
                        } else {
                            data.workbookHide = true;
                        }
                    }
                }),
                " Hide requirement from workbook"
            ]);
        }

        viewWorkbook(data) {
            return m(components.WorkbookItemList, {
                data: data.workbook
            });
        }

        viewChildren(data) {
            return m(components.RequirementList, {
                data: data.children
            });
        }
    };
};
