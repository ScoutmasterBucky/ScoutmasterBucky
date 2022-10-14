/* global m */

module.exports = function () {
    return class SelectMeritBadge {
        constructor() {
            this.loading = true;
            this.meritBadges = {};
            m.request({
                url: "merit-badges.json"
            }).then((result) => {
                this.loading = false;
                this.meritBadges = result;
            });
        }

        view() {
            if (this.loading) {
                return "Loading list of merit badges...";
            }

            const options = [];

            for (const [k, v] of Object.entries(this.meritBadges)) {
                if (v.active) {
                    options.push(m("li", this.viewLink(k, v.name)));
                }
            }

            return [
                m("p", [
                    this.viewLink("_blank", "Start New"),
                    " - ",
                    this.viewLink("_test", "Test")
                ]),
                m("ul", options)
            ];
        }

        viewLink(meritBadge, text) {
            return m(
                m.route.Link,
                {
                    href: "/edit/:meritBadge",
                    params: {
                        meritBadge
                    }
                },
                text
            );
        }
    };
};
