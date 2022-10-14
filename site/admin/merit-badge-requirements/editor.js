/* global m, navigator, YAML */

module.exports = function (components) {
    return class Editor {
        constructor() {
            this.copyDisabled = false;
            this.loading = "requirements";
            this.meritBadge = m.route.param("meritBadge");

            if (!this.meritBadge) {
                this.restart();

                return Promise.reject();
            }

            let url = `/merit-badges/${this.meritBadge}/requirements.yaml`;

            if (this.meritBadge.charAt(0) === "_") {
                url = this.meritBadge.substr(1) + ".yaml";
            }

            m.request({
                url,
                extract: (xhr) => YAML.parse(xhr.responseText)
            }).then(
                (requirements) => {
                    this.loading = null;
                    this.requirements = requirements;
                },
                (err) => {
                    console.error(err);
                    this.restart();
                }
            );
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
                            const yamlStr = YAML.stringify(
                                this.cleanseArray(this.requirements),
                                {
                                    indent: 4
                                }
                            );
                            console.log(yamlStr);
                            navigator.clipboard.writeText(yamlStr);
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
