var marked = require('marked');

module.exports = function (obj) {
    let lines = obj.fn(this);

    // Split on newlines
    lines = lines.split(/\r?\n/);

    // Change lines to be objects that track indentation level and content
    lines = lines.map(line => {
        let match = line.match(/^(    )+/);
        let level = match ? match[0].length / 4 : 0;
        let trimmed = line.trim();

        let numberMatch = trimmed.match(/^[^a-zA-Z0-9]*([0-9][0-9]?|[a-zA-Z]|[ivx]+)[^a-zA-Z0-9 ]* /);
        let number = '';

        if (numberMatch) {
            number = numberMatch[0];
            trimmed = trimmed.replace(number, '')
            level += 1;
        }

        return {
            level: level,
            number: number,
            content: trimmed
        };
    });

    // Drop blank lines
    lines = lines.filter(line => line.content !== '');

    // Wrap and add the padding to the left, plus convert from object back to
    // text
    lines = lines.map(line => {
        const increment = 32;
        let pad = Math.max(0, (line.level - 1) * increment);
        let w = Math.max(0, line.level * increment);

        let content = line.content;

        // Add a bit of padding after paragraphs
        if (content.charAt(0) !== '<') {
            content = `
<div class="Pb(smbReqP)">

${content}

</div>`;
        }

        return `
<div class="D(f)"><div class="Pend(0.2em) Pstart(${pad}px) Fxs(0) W(${w}px)">${marked(line.number.trim())}</div><div>

${content}

</div></div>
`;
    });

    return '<div class="My(1em)">' + lines.join('\n') + '</div>\n';
};
