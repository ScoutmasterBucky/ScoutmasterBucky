import { component, emit, html } from 'fudgel';

component(
    'group-o-matic-step-4',
    {
        prop: ['best'],
        template: html`
            <h2>Group Results</h2>

            <div *for="session, sessionIndex of best">
                <h3>Session {{ sessionIndex + 1 }}</h3>

                <div *for="group, groupIndex of session">
                    <p>Group {{ groupIndex + 1 }}</p>

                    <table>
                        <tr>
                            <th *for="field of fields">{{ field }}</th>
                        </tr>
                        <tr v-for="record in group">
                            <td *for="field of fields">{{ record[field] }}</td>
                        </tr>
                    </table>
                </div>
            </div>
        `,
    },
    class {
        best: any[] = [];
        fields: any[] = [];

        onChange(propName: string) {
            if (propName === 'best') {
                this.fields = Object.keys(this.best[0][0][0]);
            }
        }
    }
);
