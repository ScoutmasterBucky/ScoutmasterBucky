/* global document */
(function () {
    var d = new Date();
    var picture =
        '<img src="/images/header-month-' +
        (d.getMonth() + 1) +
        '.jpg" class="W(100%) H(a) D(b)" height="279" width="1002">';
    document.write(picture);
})();
