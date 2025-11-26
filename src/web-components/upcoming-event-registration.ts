import { component, css, html } from 'fudgel';

component('upcoming-event-registration', {
    prop: ['event'],
    style: css`
        .registration-button {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 1em;
            font-size: 1.5em;
        }

        a {
            color: var(--event-registration-text-color);
            text-decoration: none;
        }

        .button {
            background: var(--event-registration-button-background);
            text-align: center;
            padding: 0.4em 0.8em;
            border-radius: 18px;
            border-block: outset;
        }

        .button:hover {
            background: var(--event-registration-button-background-hover);
            transition: all 0.2s;
        }
    `,
    template: html`
        <div class="registration-button">
            <a .href="event.registrationLink" target="_blank">
                <div class="button">Register Here</div>
            </a>
        </div>
    `,
});
