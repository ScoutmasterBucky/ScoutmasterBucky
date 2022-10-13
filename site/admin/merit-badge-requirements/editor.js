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

        cleanse(t) {
            if (Array.isArray(t)) {
                return this.cleanseArray(t);
            }

            if (t && typeof t === "object") {
                return this.cleanseObject(t);
            }

            if (t !== false && t !== null && t !== "") {
                return t;
            }

            return undefined;
        }

        cleanseArray(a) {
            const copy = [];

            for (const i of a) {
                const i2 = this.cleanse(i);

                if (i2 !== undefined) {
                    copy.push(i2);
                }
            }

            if (copy.length) {
                return copy;
            }

            return undefined;
        }

        cleanseObject(o) {
            const copy = {};

            for (const [k, v] of Object.entries(o)) {
                const v2 = this.cleanse(v);

                if (v2 !== undefined) {
                    copy[k] = v2;
                }
            }

            if (Object.keys(copy).length) {
                return copy;
            }

            return undefined;
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
                                    this.cleanseArray(this.requirements),
                                    Number.POSITIVE_INFINITY,
                                    4
                                )
                            );
                        },
                        label: this.copyDisabled
                            ? "** COPIED **"
                            : "Copy YAML to Clipboard"
                    })
                ]),
                m(components.RequirementList, {
                    data: this.requirements
                })
            ];
        }
    };
};
