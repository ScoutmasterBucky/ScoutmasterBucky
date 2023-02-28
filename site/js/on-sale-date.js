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
        s +=
            months[d.getUTCMonth()] +
            " " +
            d.getUTCDate() +
            ", " +
            d.getFullYear();
        s += "</div>";
        document.write(s);
    }
};
