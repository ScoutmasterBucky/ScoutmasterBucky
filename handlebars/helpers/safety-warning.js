var marked = require('marked');

module.exports = function(obj) {
    // One line so it can be used within requirements
    return `<div class="M(1em)--_s M(0.5em)--s Bdc(red) Bdw(0.5em)--_s Bdw(0.25em)--s P(1em)--_s P(0.5em)--s">${marked.parse(obj.fn(this))}</div>`;
};
