import { component, css, html } from 'fudgel';
import testLabs from '~/data/test-labs.yaml';

component(
    'upcoming-event-test-labs',
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
                <a *for="badge of badges" href="/test-labs/{{badge}}/">
                    <img src="{{testLabs[badge]?.image}}" />
                    {{ testLabs[badge]?.name ?? badge }}
                </a>
            </div>
        `,
    },
    class {
        badges: string[] = [];
        event: any;
        testLabs = testLabs;
        onChange(propName: string) {
            if (propName === 'event') {
                this.badges = (this.event.testLabs || []).sort(
                    (a: string, b: string) => a.localeCompare(b)
                );
            }
        }
    }
);
