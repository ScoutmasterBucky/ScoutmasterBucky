/* class=notesToggles-{{type}}  and type can be none, inPerson, online */
window.addEventListener('load', function () {
    var search = (document.location.search || "").toString();
    var searchParts = (search || '?').substr(1).split('&');
    var notesToggle = 'none';
    var i;

    for (i = 0; i < searchParts.length; i += 1) {
        var parts = searchParts[i].split('=');

        if (parts[0] === 'notes') {
            notesToggle = parts[1];
        }
    }

    setNotesToggles(notesToggle, true);
});

function setNotesToggles(name, skipLocationUpdate) {
    var i;
    var elems = document.getElementsByClassName('notesToggles')

    for (i = 0; i < elems.length; i += 1) {
        var cl = elems[i].classList;

        for (className of cl) {
            if (className.match(/^notesToggles-/)) {
                cl.remove(className);
            }
        }

        cl.add('notesToggles-' + name);
    }

    if (!skipLocationUpdate) {
        let search = name !== 'none' ? '?notes=' + name : '?';

        history.pushState(null, null, search);
    }
}
