const fs = require('fs');
const yaml = require('js-yaml');

const metadata = {
    buildDate: new Date().toISOString(),
    buildTime: Date.now(),
    classPrepBring: yaml.load(fs.readFileSync("./class-prep-bring.yaml", "utf8")),
    classPrepInsights: yaml.load(fs.readFileSync("./class-prep-insights.yaml", "utf8")),
    liveReload: !!process.env.LIVE_RELOAD,
    meritBadges: require("./merit-badges.json"),
    novaAwards: require("./nova-awards.json"),
    otherAwards: require("./other-awards.json"),
    scoutRanks: require("./scout-ranks.json"),
    site: {
        buildDate: "replaced by metalsmith.js",
        owner: "Scoutmaster Bucky",
        ownerEmail: "scoutmasterbucky@yahoo.com",
        title: "Scoutmaster Bucky",
        url: "https://scoutmasterbucky.com/",
        urlToRoot: "/"
    },
    supernovaAwards: require("./supernova-awards.json"),
    updated: require("./updated.json")
};

const meritBadgeMeta = {
    active: Object.values(metadata.meritBadges).filter((x) => x.active)
};

meritBadgeMeta.activeCount = meritBadgeMeta.active.length;
metadata.meritBadgeMeta = meritBadgeMeta;
module.exports = metadata;
