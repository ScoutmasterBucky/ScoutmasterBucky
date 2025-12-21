import './show-modal';
import './upcoming-event-calendar';
import './upcoming-event-details';
import './upcoming-event-icon';
import './upcoming-event-location';
import './upcoming-event-online-banner';
import { component, css, html } from 'fudgel';

component(
    'upcoming-event',
    {
        prop: ['event'],
        style: css`
            :host {
                position: relative;
                display: flex;
                flex-direction: column;
                height: 100%;
            }

            .wrapper {
                flex-grow: 1;
                flex-shrink: 0;
                overflow: hidden;
                padding: 0.5em;
            }

            .top-bar {
                display: flex;
                justify-content: space-around;
                align-items: flex-start;
            }

            .title {
                text-align: center;
                font-size: 1.4em;
                padding-top: 10px;
            }

            upcoming-event-online-banner {
                flex-shrink: 0;
            }

            .notice {
                background-color: var(--event-notice-background);
                display: flex;
                justify-content: center;
                align-items: center;
                text-align: center;
                border-top: var(--event-notice-border);
                flex-shrink: 0;
            }
        `,
        template: html`
            <div class="wrapper" @click="showModal()">
                <div class="top-bar">
                    <!-- Icon -->
                    <upcoming-event-icon .event="event"></upcoming-event-icon>

                    <!-- Calendar -->
                    <upcoming-event-calendar
                        .event="event"
                    ></upcoming-event-calendar>

                    <!-- Location -->
                    <upcoming-event-location
                        .event="event"
                    ></upcoming-event-location>
                </div>

                <div class="title">{{ event.title }}</div>
            </div>

            <upcoming-event-online-banner
                *if="!event.location"
                @click="showModal()"
            ></upcoming-event-online-banner>

            <div @click="showModal()" *if="event.noticeTile" class="notice">
                {{ event.noticeTile }}
            </div>

            <show-modal *if="modal" @close="hideModal()">
                <upcoming-event-details .event="event"></upcoming-event-details>
            </show-modal>
        `,
    },
    class {
        modal = false;

        hideModal() {
            this.modal = false;
        }

        showModal() {
            this.modal = true;
        }
    }
);
