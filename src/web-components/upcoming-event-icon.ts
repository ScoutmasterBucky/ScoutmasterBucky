import { component, css, html } from 'fudgel';

component('upcoming-event-icon', {
    prop: ['event'],
    style: css`
        .icon {
            width: 76.5px;
            height: 76.5px;
        }
    `,
    template: html`
        <div class="icon">
            <img *if="event.icon" .src="event.icon" class="wide" />
        </div>
    `,
});
