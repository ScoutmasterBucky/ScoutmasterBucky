/* global document, window */
(function () {
    function pad(n) {
        if (n < 10) {
            return `0${n}`;
        }

        return n;
    }

    function getTimeOfDay(d) {
        let a = "AM";
        let h = d.getHours();
        let m = d.getMinutes();

        if (h >= 12) {
            a = "PM";
        }

        h %= 12;

        if (h === 0) {
            h = 12;
        }

        if (m < 10) {
            m = "0" + m;
        }

        return `${h}:${pad(m)} ${a}`;
    }

    function writeLocalTime(date) {
        document.write(
            `<div class="Ta(c)">In your timezone:<br>${getTimeOfDay(
                date
            )}</div>`
        );
    }

    window.eventTileTime = (dateStr) => {
        const d = new Date(dateStr);
        const offset = d.getTimezoneOffset();
        const offsetSign = offset > 0 ? "-" : "+";
        const offsetHours = pad(Math.floor(Math.abs(offset) / 60));
        const offsetMin = pad(Math.abs(offset) % 60);
        const offsetStr = offsetSign + offsetHours + ":" + offsetMin;

        if (offsetStr !== dateStr.slice(-6)) {
            writeLocalTime(d);
        }
    };
})();
