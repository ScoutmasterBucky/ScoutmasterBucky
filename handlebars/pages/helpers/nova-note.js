var marked = require('marked');

module.exports = function(obj) {
    return `<div class="C(novaThmTx) Fs(i) Pb(1em)">${marked(obj.fn(this))}</div>`;
};
