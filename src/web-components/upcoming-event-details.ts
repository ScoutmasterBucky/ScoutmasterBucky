import './upcoming-event-icon.js';
import './upcoming-event-merit-badges.js';
import './upcoming-event-registration.js';
import { component, css, html } from 'fudgel';

component(
    'upcoming-event',
    {
        prop: ['event'],
        style: css`
.selectable {
    user-select: text;
}

.big {
    font-size: 32px;
}

.time {
    font-size: 1.4em;
}

.time-location {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    gap: 20px;
}

@media (min-width: 768.0001px) and (max-width: 1024px) {
    .big {
        font-size: 24px;
    }

    .time {
        font-size: 1.3em;
    }
}

@media (min-width: 480.0001px) and (max-width: 768px) {
    .big {
        font-size: 20px;
    }

    .time {
        font-size: 1.2em;
    }
}

@media (max-width: 480px) {
    .big {
        font-size: 16px;
    }

    .time-location {
        flex-direction: column;
    }

    .time {
        font-size: 1.1em;
    }
}

.bottom-line {
    border-bottom: var(--event-details-border);
}
`,
        template: html`
    <div class="selectable">
        <div class="big center column bottom-line"><upcoming-event-icon .event="event" />{{ event.host }}</div>
        <div class="big center">{{ event.title }}</div>
        <div class="time-location">
            <div class="time center">
                <div *if="event.differentDays">
                    From: {{ event.startDate.local.MMM }}
                    {{ event.startDate.local.d }}<br />
                    Until: {{ event.endDate.local.MMM }}
                    {{ event.endDate.local.d }}
                </div>
                <div *if="!event.differentDays">
                    {{ event.startDate.local.MMM }}
                    {{ event.startDate.local.d
                    }}<span *if="event.startDate.hasTime"
                        ><br />{{ event.startDate.local.hmma }}
                        <span *if="event.endDate && event.endDate.hasTime"
                            >to {{ event.endDate.local.hmma }}</span
                        ><span *if="!event.isCentral"
                               ><br />(in your timezone)</span
                        >
                    </span>
                </div>
            </div>
            <div *if="event.location" class="location">
                <div *for="line of event.location">
                    {{ line }}
                </div>
            </div>
            <div *if="!event.location" class="online">Online</div>
        </div>
        <upcoming-event-merit-badges *if="event.meritBadges" .event="event" />
        <div *if="event.html" .inner-h-t-m-l="event.html"></div>
        <upcoming-event-registration *if="event.registrationLink" .event="event" />
    </div>
`,
    },
    class {
        event: any;
    }
);
