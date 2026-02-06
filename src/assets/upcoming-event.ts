import type { Controller } from 'fudgel';
import('./show-modal');
import('./upcoming-event-calendar');
import('./upcoming-event-details');
import('./upcoming-event-icon');
import('./upcoming-event-location');
import('./upcoming-event-online-banner');
import('luxon').then(({ DateTime }) => {
    import('fudgel').then(({ component, css, html, metadata }) => {
        import('../utils/string-to-date').then(({ stringToDate }) => {
            component(
                'upcoming-event',
                {
                    attr: ['event'],
                    style: css`
                        :host {
                            position: relative;
                            display: flex;
                            flex-direction: column;
                            height: 100%;
                            width: 33%;
                        }

                        :host.invisible {
                            display: none;
                        }

                        @media (min-width: 480.0001px) and (max-width: 768px) {
                            :host {
                                width: 50%;
                            }
                        }

                        @media (max-width: 480px) {
                            :host {
                                width: 100%;
                            }
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

                        .box {
                            margin: 0.5em;
                            border: var(--tile-border);
                            border-radius: 1em;
                            transition: all 0.2s;
                            user-select: none;
                            height: 100%;
                            overflow: hidden;
                        }

                        .box:hover {
                            background: var(--tile-hover-background);
                        }
                    `,
                    template: html`
                        <div *if="eventObj" class="box">
                            <div class="wrapper" @click="showModal()">
                                <div class="top-bar">
                                    <!-- Icon -->
                                    <upcoming-event-icon
                                        .event="eventObj"
                                    ></upcoming-event-icon>

                                    <!-- Calendar -->
                                    <upcoming-event-calendar
                                        .event="eventObj"
                                    ></upcoming-event-calendar>

                                    <!-- Location -->
                                    <upcoming-event-location
                                        .event="eventObj"
                                    ></upcoming-event-location>
                                </div>

                                <div class="title">{{ eventObj?.title }}</div>
                            </div>

                            <upcoming-event-online-banner
                                *if="!eventObj?.location"
                                @click="showModal()"
                            ></upcoming-event-online-banner>

                            <div
                                @click="showModal()"
                                *if="eventObj?.noticeTile"
                                class="notice"
                            >
                                {{ eventObj?.noticeTile }}
                            </div>

                            <show-modal
                                *if="modal"
                                @close="hideModal()"
                                @keydown.outside.prevent.escape="hideModal()"
                            >
                                <upcoming-event-details
                                    .event="eventObj"
                                ></upcoming-event-details>
                            </show-modal>
                        </div>
                    `,
                },
                class {
                    event: string = '';
                    eventObj: any = null;
                    modal = false;

                    onChange(propName: string) {
                        if (propName === 'event' && this.event) {
                            this.handleEventUpdate(this.event);
                        }
                    }

                    hideModal() {
                        this.modal = false;
                    }

                    showModal() {
                        this.modal = true;
                    }

                    private areDaysDifferent(event: any) {
                        if (!event.end) {
                            return false;
                        }

                        return (
                            event.start.split(' ')[0] !==
                            event.end.split(' ')[0]
                        );
                    }

                    private formatDateLocal(date: Date, format: string) {
                        return DateTime.fromJSDate(date).toFormat(format);
                    }

                    private handleEventUpdate(eventJson: string) {
                        let eventObj = null;

                        try {
                            eventObj = JSON.parse(eventJson);
                        } catch (e) {
                            console.error('Error parsing event JSON:', e);
                            this.eventObj = null;
                            return;
                        }

                        const endDate = this.toDate(eventObj.end);

                        if (!endDate || endDate.date.getTime() < Date.now()) {
                            (this as Controller)[metadata]!.host.classList.add(
                                'invisible'
                            );
                            this.eventObj = null;
                            return;
                        }

                        const startDate = this.toDate(eventObj.start);
                        const d = new Date();
                        const offset1 =
                            DateTime.fromJSDate(d).setZone(
                                'America/Chicago'
                            ).offset;
                        const offset2 = DateTime.fromJSDate(d).offset;
                        (this as Controller)[metadata]!.host.classList.remove(
                            'invisible'
                        );
                        this.eventObj = {
                            ...eventObj,
                            isCentral: offset1 === offset2,
                            startDate,
                            endDate,
                            hideDate: endDate || startDate,
                            differentDays: this.areDaysDifferent(eventObj),
                        };
                    }

                    private toDate(dateString: string | undefined) {
                        const { date, hasTime, success } =
                            stringToDate(dateString);

                        if (!success) {
                            return;
                        }

                        const timestamp = date.getTime();

                        return {
                            date,
                            hasTime,
                            local: {
                                MMM: this.formatDateLocal(date, 'MMM'),
                                d: this.formatDateLocal(date, 'd'),
                                hmma: this.formatDateLocal(date, 'h:mm a'),
                            },
                            timestamp,
                        };
                    }
                }
            );
        });
    });
});
