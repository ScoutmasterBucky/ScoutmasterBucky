/* global document, window */
window.onSaleDate = (dateStr) => {
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    const d = new Date(dateStr);

    if (d > new Date()) {
        let s = '<div class="Ta(c) Fw(b)">Tickets go on sale<br>';
        let h = d.getHours();
        let ampm = "AM";

        if (!h) {
            h = 12;
        }

        if (h > 12) {
            h -= 12;
            ampm = "PM";
        }

        let m = d.getMinutes().toString();

        if (m.length < 2) {
            m = "0" + m;
        }

        s +=
            months[d.getUTCMonth()] +
            " " +
            d.getUTCDate() +
            ", " +
            d.getFullYear() +
            " at " +
            h +
            ":" +
            m +
            " " +
            ampm;
        s += "</div>";
        document.write(s);
    }
};
