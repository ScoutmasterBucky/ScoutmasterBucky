const pluginKit = require('metalsmith-plugin-kit');

module.exports = function removeUnnecessaryAssets() {
    return pluginKit.middleware({
        each: function (filename, fileObject, files) {
            const pathParts = filename.split('/');
            let remove = false;

            if (pathParts[0] === 'merit-badges') {
                if (`${pathParts[1]}.pdf` === pathParts[2]) {
                    remove = true;
                } else if (`${pathParts[1]}.txt` === pathParts[2]) {
                    remove = true;
                }
            }

            if (pathParts[0] === 'events' && pathParts[1] === 'completed') {
                remove = true;
            }

            if (pathParts[0] === 'events' && pathParts[1] === 'templates') {
                remove = true;
            }

            if (remove) {
                delete files[filename];
            }
        }
    });
};
