const marked = require('marked');

module.exports = function (obj) {
    let content = obj.fn(this);

    // Backticks are escaped, which breaks markdown
    content = content.replace(/&#x60;/g, '`');

    return marked.parse(content);
};
