import { component, css, html } from 'fudgel';
import meritBadges from '~/data/merit-badges.yaml';

component(
    'upcoming-event-merit-badges',
    {
        prop: ['event'],
        style: css`
            div {
                display: flex;
                justify-content: center;
                align-items: center;
                flex-wrap: wrap;
            }

            a {
                display: flex;
                align-items: center;
                margin: 0 5px;
            }

            img {
                width: 15px;
                height: auto;
            }
        `,
        template: html`
            <div>
                <a *for="badge of badges" href="/merit-badges/{{badge}}/">
                    <img src="{{meritBadges[badge]?.image}}" />
                    {{ meritBadges[badge]?.name ?? badge }}
                </a>
            </div>
        `,
    },
    class {
        badges: string[] = [];
        event: any;
        meritBadges = meritBadges;
        onChange(propName: string) {
            if (propName === 'event') {
                this.badges = (this.event.meritBadges || []).sort(
                    (a: string, b: string) => a.localeCompare(b)
                );
            }
        }
    }
);
