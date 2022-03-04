const marked = require('marked');

module.exports = function (obj) {
    const content = obj.fn(this);

    return marked.parse(content);
};
