module.exports = function (obj) {
    let lines = obj.fn(this);

    // Split on newlines
    lines = lines.split(/\r?\n/);

    // Change lines to be objects that track indentation level and content
    lines = lines.map(line => {
        let match = line.match(/^(    )+/);
        let level = match ? match[0].length / 4 : 0;
        let trimmed = line.trim();

        let numberMatch = trimmed.match(/^([0-9][0-9]?|[a-z]|[ivx]+)\./);
        let number = null;

        if (numberMatch) {
            number = numberMatch[0];
            trimmed = trimmed.replace(/^[^.]*\. */, '')
        }

        return {
            level: level,
            number: number,
            content: trimmed
        };
    });

    // Drop blank lines
    lines = lines.filter(line => line.content !== '');

    console.log(lines);

    // Join back into text
    lines = lines.map(line => line.content);

    return lines.join('\n');
};
