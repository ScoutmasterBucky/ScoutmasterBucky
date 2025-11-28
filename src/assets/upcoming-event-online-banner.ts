import { component, css, html } from 'fudgel';

component('upcoming-event-online-banner', {
    style: css`
        .online-banner {
            background: var(--event-online-banner-background);
            border: var(--event-online-banner-border);
            font-size: 0.8em;
            font-weight: bold;
            left: -35px;
            overflow: hidden;
            padding-top: 0.2em;
            position: absolute;
            text-align: center;
            top: -25px;
            transform-origin: bottom right;
            transform: rotate(-35deg);
            width: 140px;
        }
    `,
    template: html` <div class="online-banner">ONLINE</div> `,
});
