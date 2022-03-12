var search = (document.location.search || "").toString();
var searchParts = (search || '?').substr(1).split('&');

// Do not use other methods. The transpiling of JS messes this up and it
// doesn't run right in wkhtmltopdf
for (let i = 0; i < searchParts.length; i += 1) {
    var parts = searchParts[i].split('=');

    if (parts[0] === 'print') {
        removeBackgrounds();
    }
}

function removeBackgrounds() {
    var elems = document.getElementsByClassName('printBgStyleRemove');

    // Do not use other methods. The transpiling of JS messes this up and it
    // doesn't run right in wkhtmltopdf
    for (var i = 0; i < elems.length; i += 1) {
        let e = elems[i];
        e.style.removeProperty('background-image');
    }
}
