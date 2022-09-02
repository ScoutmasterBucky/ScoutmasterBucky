const metadata = {
    buildDate: new Date().toISOString(),
    buildTime: Date.now(),
    liveReload: !!process.env.LIVE_RELOAD,
    meritBadges: require("./merit-badges.json"),
    novaAwards: require("./nova-awards.json"),
    site: {
        buildDate: "replaced by metalsmith.js",
        owner: "Scoutmaster Bucky",
        ownerEmail: "scoutmasterbucky@yahoo.com",
        title: "Scoutmaster Bucky",
        url: "https://scoutmasterbucky.com/",
        urlToRoot: "/"
    },
    supernovaAwards: require("./supernova-awards.json")
};

const fs = require('fs');
const meritBadgesUpdated = fs.readFileSync('./merit-badges-updated.txt').toString().trim();
const meritBadgeMeta = {
    active: Object.values(metadata.meritBadges).filter((x) => x.active),
    lastUpdated: meritBadgesUpdated
};

meritBadgeMeta.activeCount = meritBadgeMeta.active.length;
metadata.meritBadgeMeta = meritBadgeMeta;
module.exports = metadata;
