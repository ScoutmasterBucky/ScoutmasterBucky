import eventList from '~/data/events.yaml';
import { DateTime } from 'luxon';
import { component, html } from 'fudgel';

component(
    'upcoming-events',
    {
        template: html`
            <upcoming-event
                *for="event of filtered"
                .event="event"
            ></upcoming-event>
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
