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
            {title: 'Scoutmaster Bucky Online', description: 'Crime Prevention Merit Badge', url: '#2020-03-16-SMBO', datetime: new Date(2020, 2, 16), color: 'SMB-online'},
            {title: 'Scoutmaster Bucky Online', description: 'Digital Technology Merit Badge', url: '#2020-03-26-SMBO', datetime: new Date(2020, 2, 26), color: 'SMB-online'},
            {title: 'Scoutmaster Bucky On The Road', description: 'Hortonville, Wisconsin', url: '#2020-03-28-SMBOTR', datetime: new Date(2020, 2, 28), color: 'blue-otr'},
            {title: 'Scoutmaster Bucky Merit Badge Special', description: 'Railroading Merit Badge', url: '#2020-03-28-SMB', datetime: new Date(2020, 2, 28), color: 'black'},
            {title: 'Scoutmaster Bucky Online', description: 'Disabilities Awareness Merit Badge', url: '#2020-04-06-SMBO', datetime: new Date(2020, 3, 6), color: 'SMB-online'},
            {title: 'Scoutmaster Bucky Online', description: 'Dog Care Merit Badge', url: '#2020-04-16-SMBO', datetime: new Date(2020, 3, 16), color: 'SMB-online'},
            {title: 'Scoutmaster Bucky Online', description: 'Energy Merit Badge', url: '#2020-04-22-SMBO', datetime: new Date(2020, 3, 22), color: 'SMB-online'},
            {title: 'Scoutmaster Bucky April Merit Badge Day', description: 'click here for more info', url: '#2020-04-25-SMB', datetime: new Date(2020, 3, 25), color: 'blue-pale'},
            {title: 'Ten Ring Rifle Shooting Day', description: 'Rifle Shooting Merit Badge', url: '#2020-05-02-TR', datetime: new Date(2020, 4, 2), color: 'TR2'},
            {title: 'Scoutmaster Bucky Online', description: 'Engineering Merit Badge', url: '#2020-05-06-SMBO', datetime: new Date(2020, 4, 6), color: 'SMB-online'},
            {title: 'Scoutmaster Bucky Online', description: 'Entrepreneurship Merit Badge', url: '#2020-05-14-SMBO', datetime: new Date(2020, 4, 14), color: 'SMB-online'},
            {title: 'Ten Ring Rifle Shooting Day', description: 'Rifle Shooting Merit Badge', url: '#2020-05-16-TR', datetime: new Date(2020, 4, 16), color: 'TR2'},
            {title: 'Scoutmaster Bucky Online', description: 'Inventing Merit Badge', url: '#2020-05-19-SMBO', datetime: new Date(2020, 4, 19), color: 'SMB-online'},
            {title: '2020 Fall Wood Badge', description: 'click here for more info', url: '#2020-09-11-WB', datetime: new Date(2020, 8, 11), color: 'rose'},
            {title: '2020 Fall Wood Badge', description: 'Weekend 1', url: '#2020-09-11-WB', datetime: new Date(2020, 8, 12), color: 'rose'},
            {title: '2020 Fall Wood Badge', description: 'Weekend 1', url: '#2020-09-11-WB', datetime: new Date(2020, 8, 13), color: 'rose'},
            {title: '2020 Fall Wood Badge', description: 'Weekend 2', url: '#2020-09-11-WB', datetime: new Date(2020, 9, 3), color: 'rose'},
            {title: '2020 Fall Wood Badge', description: 'Weekend 2', url: '#2020-09-11-WB', datetime: new Date(2020, 9, 4), color: 'rose'},
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
