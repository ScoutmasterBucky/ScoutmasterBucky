/* global m, navigator, YAML */

module.exports = function (components) {
    return class Editor {
        constructor() {
            this.copyDisabled = false;
            this.loading = "merit badge metadata";
            this.meritBadge = m.route.param("meritBadge");

            if (!this.meritBadge) {
                this.restart();

                return Promise.reject();
            }

            m.request({
                url: "merit-badges.json"
            }).then((result) => {
                this.loading = "requirements";
                this.meritBadgeMeta = result[this.meritBadge];

                if (!this.meritBadgeMeta) {
                    this.restart();

                    return Promise.reject();
                }

                return m
                    .request({
                        url: `/merit-badges/${this.meritBadge}/requirements.yaml`,
                        extract: (xhr) => YAML.parse(xhr.responseText)
                    })
                    .then((requirements) => {
                        this.loading = null;
                        this.requirements = requirements;
                    });
            });
        }

        restart() {
            m.route.set("/");
        }

        view() {
            if (this.loading) {
                return `Loading ${this.loading}`;
            }

            return [
                m("p", [
                    m(m.route.Link, { href: "/" }, "Start over"),
                    " - ",
                    m(components.Button, {
                        disabled: this.copyDisabled,
                        onclick: () => {
                            this.copyDisabled = true;
                            setTimeout(() => {
                                this.copyDisabled = false;
                                m.redraw();
                            }, 1000);
                            navigator.clipboard.writeText(
                                YAML.stringify(
                                    this.requirements,
                                    Number.POSITIVE_INFINITY,
                                    4
                                )
                            );
                        },
                        label: this.copyDisabled ? "** COPIED **" : "Copy YAML to Clipboard"
                    })
                ]),
                m(components.RequirementList, {
                    data: this.requirements
                })
            ];
        }
    };
};
