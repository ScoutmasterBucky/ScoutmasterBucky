let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

$(function() {
    $("#calendar").eCalendar({
        weekDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        months: months,
        textArrows: { previous: "<", next: ">" },
        eventTitle: "Events",
        url: "",
        events: window.events
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
    const from = new Date(fromStr);
    const to = new Date(toStr);
    const offset = from.getTimezoneOffset();
    const offsetSign = offset > 0 ? "-" : "+";
    let offsetHours = Math.floor(Math.abs(offset) / 60);
    let offsetMin = Math.abs(offset) % 60;

    if (offsetMin < 10) {
        offsetMin = "0" + offsetMin;
    }

    if (offsetHours < 10) {
        offsetHours = "0" + offsetHours;
    }

    const offsetStr = offsetSign + offsetHours + ":" + offsetMin;

    if (offsetStr !== fromStr.substr(fromStr.length - 6)) {
        writeTime(from, to);
    }
}

function onSaleDate(dateStr) {
    var d = new Date(dateStr);

    if (d > new Date()) {
        var s = '<div class="Ta(c) Fw(b)">Tickets go on sale<br>';
        s += months[d.getUTCMonth()] + ' ' + d.getUTCDate() + ', ' + d.getFullYear();
        s += '</div>'
        document.write(s);
    }
}

function writeTime(from, to) {
    let output = '<div class="Ta(c) Fw(b)">In your timezone:<br>';

    if (isSameDay(from, to)) {
        output += getTimeOfDay(from) + " - " + getTimeOfDay(to);
    } else {
        output += "From " + getFullDate(from) + "<br/>To " + getFullDate(to);
    }

    output += "</div>";
    document.write(output);
}

function isSameDay(a, b) {
    if (
        a.getFullYear() !== b.getFullYear() ||
        a.getMonth() !== b.getMonth() ||
        a.getDay() !== b.getDay()
    ) {
        return false;
    }

    return true;
}

function getFullDate(d) {
    return d.toLocaleDateString() + " " + getTimeOfDay(d);
}

function getTimeOfDay(d) {
    var a = "AM";
    var h = d.getHours();
    var m = d.getMinutes();

    if (h >= 12) {
        a = "PM";
    }

    h = h % 12;

    if (h === 0) {
        h = 12;
    }

    if (m < 10) {
        m = "0" + m;
    }

    return h + ":" + m + " " + a;
}

function updateIframes() {
    var iframes = document.getElementsByTagName("iframe");
    var i;
    var iframe, attribs, src, dataSrc;

    for (i = 0; i < iframes.length; i += 1) {
        iframe = iframes[i];

        if (isVisible(iframe)) {
            src = iframe.attributes.getNamedItem("src");
            dataSrc = iframe.attributes.getNamedItem("data-src");

            if (!src && dataSrc) {
                src = document.createAttribute("src");
                src.value = dataSrc.value;
                iframe.attributes.setNamedItem(src);
            }
        }
    }
}

function isVisible(e) {
    return e.offsetWidth || e.offsetHeight || e.getClientRects().length;
}

function countdown(to, message) {
    var id = 'countdown' + Math.random();
    var to = new Date(to);
    document.write('<span id="' + id + '"></span>');

    var interval = setInterval(function () {
        var e = document.getElementById(id);

        if (!e) {
            return;
        }

        var diff = to - Date.now();

        if (diff < 0) {
            e.innerHTML = message;
            clearInterval(interval);
            return;
        }

        var s = Math.floor(diff / 1000);
        var m = Math.floor(s / 60);
        s = s % 60;
        var h = Math.floor(m / 60);
        m = m % 60;
        var d = Math.floor(h / 24);
        h = h % 24;

        const out = [];

        if (d) {
            out.push(d + ' days');
        }

        if (d || h) {
            out.push(h + ' hours');
        }

        if (d || h || m) {
            out.push(m + ' minutes');
        }

        if (d || h || m || s) {
            out.push(s + ' seconds');
        }

        e.innerHTML = out.join(', ');
    }, 1000);
}

window.addEventListener("load", updateIframes);
