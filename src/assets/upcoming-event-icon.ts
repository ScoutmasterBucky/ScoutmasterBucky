import { component, css, html } from 'fudgel';

component('upcoming-event-icon', {
    prop: ['event'],
    style: css`
        .icon {
            width: 76.5px;
            height: 76.5px;
            background-position: center;
            background-size: contain;
            background-repeat: no-repeat;
        }
    `,
    template: html`
        <div class="icon" style="background-image: url({{event.icon}})"></div>
    `,
});
