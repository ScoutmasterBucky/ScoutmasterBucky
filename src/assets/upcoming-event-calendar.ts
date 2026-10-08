import { component, css, html } from 'fudgel';

component(
    'upcoming-event-calendar',
    {
        prop: ['event'],
        style: css`
            .calendar {
                border: var(--event-calendar-border);
                border-radius: 5px;
            }

            .calendar-month {
                font-size: 1.2em;
                background: var(--event-calendar-month-background);
                padding: 0 0.2em;
            }

            .calendar-day {
                font-size: 2em;
                min-width: 1.7em;
                padding: 0 0.2em;
                min-height: 45px;
            }

            .calendar-day.multiple {
                font-size: 1.5em;
            }

            .calendar-day.far {
                font-size: 1.2em;
                display: flex;
                align-items: center;
                justify-content: center;
                white-space: nowrap;
            }
        `,
        template: html`
            <div class="calendar">
                <div class="center calendar-month">{{ month }}</div>
                <div class="center calendar-day {{multipleClass}}">
                    {{ day }}
                </div>
            </div>
        `,
    },
    class {
        event: any;
        day = '';
        month = '';
        multipleClass = '';

        onInit() {
            let event = this.event;
            let month = event.startDate.local.MMM;
            let day = event.startDate.local.d;
            let multiple = false;
            let multipleMonths = false;

            if (event.endDate) {
                if (event.endDate.local.MMM !== month) {
                    month += `/${event.endDate.local.MMM}`;
                    multiple = true;
                    multipleMonths = true;
                }

                if (event.endDate.local.d !== day || multiple) {
                    day += `-${event.endDate.local.d}`;
                    multiple = true;
                }
            }

            this.multipleClass = multiple ? 'multiple' : '';
            this.month = month;
            this.day = day;

            // Events over a year away show the year so they are not
            // confused with the same month in the coming year.
            const nextYear = new Date();
            nextYear.setFullYear(nextYear.getFullYear() + 1);

            if (event.startDate.timestamp > nextYear.getTime()) {
                this.month = event.startDate.local.yyyy;
                this.day = multipleMonths ? month : `${month} ${day}`;
                this.multipleClass = 'far';
            }
        }
    }
);
