import './upcoming-event';
import eventList from '~/data/events.yaml';
import { DateTime } from 'luxon';
import { component, css, html } from 'fudgel';

component(
    'upcoming-events',
    {
        // NOTE: styles are copied from Astro components tile and tile-wrapper
        style: css`
            .tile-wrapper {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-evenly;
                align-content: stretch;
                text-align: initial;
            }

            .size {
                width: 33%;
                padding: 0.5em;
            }

            @media (min-width: 480.0001px) and (max-width: 768px) {
                .size {
                    width: 50%;
                }
            }

            @media (max-width: 480px) {
                .size {
                    width: 100%;
                }
            }

            .box {
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
            <div class="tile-wrapper">
                <div *for="event of filtered" class="size">
                    <div class="box">
                        <upcoming-event .event="event"></upcoming-event>
                    </div>
                </div>
            </div>
        `,
    },
    class {
        filtered: any[];

        constructor() {
            this.filtered = (eventList || [])
                .map((event: any) => {
                    const startDate = this.toDate(event.start);
                    const endDate = this.toDate(event.end);
                    const d = new Date();
                    const offset1 =
                        DateTime.fromJSDate(d).setZone(
                            'America/Chicago'
                        ).offset;
                    const offset2 = DateTime.fromJSDate(d).offset;

                    return {
                        ...event,
                        isCentral: offset1 === offset2,
                        startDate,
                        endDate,
                        hideDate: endDate || startDate,
                        differentDays: this.areDaysDifferent(event),
                    };
                })
                .filter(
                    (event: any) =>
                        (event.hideDate?.timestamp ?? 0) > Date.now()
                );
        }

        areDaysDifferent(event: any) {
            if (!event.end) {
                return false;
            }

            return event.start.split(' ')[0] !== event.end.split(' ')[0];
        }

        formatDateLocal(date: Date, format: string) {
            return DateTime.fromJSDate(date).toFormat(format);
        }

        toDate(dateString: string | undefined) {
            if (!dateString) {
                return;
            }

            let date = new Date();
            let hasTime = false;

            if (!dateString.includes(' ')) {
                date = DateTime.fromFormat(dateString, 'yyyy-MM-dd').toJSDate();
            } else {
                date = DateTime.fromFormat(dateString, 'yyyy-MM-dd H:mm', {
                    zone: 'America/Chicago',
                }).toJSDate();
                hasTime = true;
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
