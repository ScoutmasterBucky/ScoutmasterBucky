import './show-modal.js';
import './upcoming-event-calendar.js';
import './upcoming-event-details.js';
import './upcoming-event-icon.js';
import './upcoming-event-location.js';
import './upcoming-event-online-banner.js';
import { component, css, html } from 'fudgel';

component(
    'upcoming-event',
    {
        prop: ['event'],
        style: css`
.wrapper {
    padding: 0.5em;
    overflow: hidden;
}

.top-bar {
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
}

.online-banner {
    position: absolute;
    top: -25px;
    left: -35px;
    transform-origin: bottom right;
    width: 140px;
    overflow: hidden;
    text-align: center;
    transform: rotate(-35deg);
    font-weight: bold;
    font-size: 0.8em;
    padding-top: 0.2em;
    background: var(--event-online-banner-background);
    border: var(--event-online-banner-border);
}

.title {
    text-align: center;
    font-size: 1.4em;
    padding-top: 10px;
}
`,
template: html`
    <div class="wrapper" @click="showModal()">
        <div class="top-bar">
            <!-- Icon -->
            <upcoming-event-icon .event="event" />

            <!-- Calendar -->
            <upcoming-event-calendar .event="event" />

            <!-- Location -->
            <upcoming-event-location .event="event" />
        </div>

        <upcoming-event-online-banner *if="!event.location" />

        <div class="title">{{ event.title }}</div>
    </div>

    <show-modal *if="modal" @close="hideModal()">
        <upcoming-event-details .event="event" />
    </show-modal>
    `
    }, class {
        event: any;
        modal = false;

        hideModal() {
            this.modal = false;
        }

        showModal() {
            this.modal = true;
        }
    });
