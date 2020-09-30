$(function () {
    $('#calendar').eCalendar({
        weekDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        textArrows: {previous: '<', next: '>'},
        eventTitle: 'Events',
        url: '',
        events: [
            // colors can be red, black, white, blue, green, yellow, brown, grey, orange, pink
            {title: 'Scoutmaster Bucky March Merit Badge Day', description: 'click here for more info', url: '#2020-03-14-SMB', datetime: new Date(2020, 2, 14), color: 'green'},
            {title: 'Scoutmaster Bucky On The Road', description: 'Hortonville, Wisconsin', url: '#2020-03-28-SMBOTR', datetime: new Date(2020, 2, 28), color: 'blue-otr'},
            {title: 'Scoutmaster Bucky Merit Badge Special', description: 'Railroading Merit Badge', url: '#2020-03-28-SMB', datetime: new Date(2020, 2, 28), color: 'black'},
            {title: 'Scoutmaster Bucky Online', description: 'Collections Merit Badge', datetime: new Date(2020, 10, 07), color: 'SMB-online'},
        ]
    });
});

function toggleClass(ele, findClass, toggleClass) {
    while (ele && !ele.classList.contains(findClass)) {
        ele = ele.parentElement;
    }

    if (ele) {
        ele.classList.toggle(toggleClass);
        updateIframes();
    }
}

function eventTime(fromStr, toStr) {
    var from = new Date(fromStr);
    var to = new Date(toStr);
    offset = from.getTimezoneOffset();
    offsetSign = offset > 0 ? '-' : '+';
    offsetHours = Math.floor(Math.abs(offset) / 60);
    offsetMin = Math.abs(offset) % 60;

    if (offsetMin < 10) {
        offsetMin = '0' + offsetMin;
    }

    if (offsetHours < 10) {
        offsetHours = '0' + offsetHours;
    }

    offsetStr = offsetSign + offsetHours + ':' + offsetMin;

    if (offsetStr !== fromStr.substr(fromStr.length - 6)) {
        writeTime(from, to);
    }
}

function writeTime(from, to) {
    output = '<div class="Ta(c) Fw(b)">In your timezone:<br>';

    if (isSameDay(from, to)) {
        output += getTimeOfDay(from) + ' - ' + getTimeOfDay(to);
    } else {
        output += 'From ' + getFullDate(from) + '<br/>To ' + getFullDate(to);
    }

    output += '</div>';
    document.write(output);
}

function isSameDay(a, b) {
    if (a.getFullYear() !== b.getFullYear() || a.getMonth() !== b.getMonth() || a.getDay() !== b.getDay()) {
        return false;
    }

    return true;
}

function getFullDate(d) {
    return d.toLocaleDateString() + ' ' + getTimeOfDay(d);
}

function getTimeOfDay(d) {
    var a = 'am';
    var h = d.getHours();
    var m = d.getMinutes();

    if (h >= 12) {
        a = 'pm';
        h -= 12;
    } else if (h < 1) {
        h = 12;
    }

    if (m < 10) {
        m = '0' + m;
    }

    return h + ':' + m + ' ' + a;
}

function updateIframes() {
    var iframes = document.getElementsByTagName('iframe');
    var i;
    var iframe, attribs, src, dataSrc;

    for (i = 0; i < iframes.length; i += 1) {
        iframe = iframes[i];

        if (isVisible(iframe)) {
            src = iframe.attributes.getNamedItem('src');
            dataSrc = iframe.attributes.getNamedItem('data-src');

            if (!src && dataSrc) {
                src = document.createAttribute('src');
                src.value = dataSrc.value;
                iframe.attributes.setNamedItem(src);
            }
        }
    }
}

function isVisible(e) {
    return e.offsetWidth || e.offsetHeight || e.getClientRects().length;
}

window.addEventListener('load', updateIframes);
