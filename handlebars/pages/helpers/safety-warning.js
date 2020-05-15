var marked = require('marked');

module.exports = function(obj) {
    // One line so it can be used within requirements
    return `<div class="M(1em) M(0.5em)--s Bdc(red) Bdw(0.5em) Bdw(0.25em)--s P(1em) P(0.5em)--s">${marked(obj.fn(this))}</div>`;
};
