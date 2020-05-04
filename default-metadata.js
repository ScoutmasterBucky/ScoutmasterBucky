const metadata = {
    buildDate: new Date().toISOString(),
    liveReload: !!process.env.SERVE,
    meritBadges: require("./merit-badges.json"),
    site: {
        buildDate: "replaced by metalsmith.js",
        owner: "Scoutmaster Bucky",
        ownerEmail: "scoutmasterbucky@yahoo.com",
        title: "Scoutmaster Bucky",
        url: "https://scoutmasterbucky.com/",
        urlToRoot: "/"
    }
};

const meritBadgeMeta = {
    active: Object.values(metadata.meritBadges).filter((x) => x.active)
};

meritBadgeMeta.activeCount = meritBadgeMeta.active.length;
metadata.meritBadgeMeta = meritBadgeMeta;
module.exports = metadata;
