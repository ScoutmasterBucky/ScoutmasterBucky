/* global document, m, window */

"use strict";

const components = require("./components");
window.addEventListener("load", () => {
    m.route(document.getElementsByClassName('module')[0], '/', {
        '/': components.SelectMeritBadge,
        '/edit/:meritBadge': components.Editor
    });
});
