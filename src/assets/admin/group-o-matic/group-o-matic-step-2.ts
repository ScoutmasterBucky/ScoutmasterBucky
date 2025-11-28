import { component, emit, html } from 'fudgel';

component(
    'group-o-matic-step-2',
    {
        prop: ['data'],
        template: html`
            <h2>Step 2: Configuration</h2>

            <table>
                <tr>
                    <th>Number of Sessions</th>
                    <td>
                        <input
                            min="1"
                            type="number"
                            value="1"
                            @change="setSessions($event.target.value)"
                        />
                    </td>
                    <td>How many times participants will meet as groups</td>
                </tr>
                <tr>
                    <th>Number of Groups</th>
                    <td>
                        <input
                            min="1"
                            type="number"
                            value="1"
                            @change="setGroups($event.target.value)"
                        />
                    </td>
                    <td>
                        Total number of groups per session (participants will be
                        divided evenly)
                    </td>
                </tr>
                <tr>
                    <th>Weight for new people in a group</th>
                    <td>
                        <input
                            type="number"
                            value="1"
                            @change="setWeight($event.target.value)"
                        />
                    </td>
                    <td>
                        Number of points to award for each new pairing of people
                        in the groups. 0 means this is not important, 1 is
                        typical, 100 would be quite extreme.
                    </td>
                </tr>
            </table>

            <hr />

            <table>
                <tr>
                    <th>Number of Participants</th>
                    <td>{{ data?.length }}</td>
                </tr>
                <tr>
                    <th>Participants per Group</th>
                    <td>{{ data?.length / groups }}</td>
                </tr>
            </table>

            <hr />

            <table>
                <tr>
                    <th>Field Name</th>
                    <th>Mapping</th>
                    <th>Weight</th>
                </tr>
                <tr *for="field of fields">
                    <td>{{ field.name }}</td>
                    <td>
                        <select
                            value="IGNORE"
                            @change="setFieldMapping(field, $event.target.value)"
                        >
                            <option value="IGNORE">Ignore</option>
                            <option value="MATCH">
                                Add points for each match
                            </option>
                            <option value="DIST">
                                Add points times distance from mean
                            </option>
                            <option value="DIST_SQ">
                                Add points times the squared distance from mean
                            </option>
                        </select>
                    </td>
                    <td>
                        <input
                            type="number"
                            value="1"
                            @change="setFieldWeight(field, $event.target.value)"
                        />
                    </td>
                </tr>
            </table>

            <button @click="emitConfig()">Use These Settings</button>

            <p>
                When matching values in a group, the weight is applied for each
                match. So, if your group had A B B C C, it would get the score
                of (weight * 2) because of the B+B and C+C pairs. If you want
                items to not match, use a negative weight.
            </p>
            <p>
                The distance from the mean numerical value is a sum of each
                member of the group and how far it is off from the mean. This
                sum is then scored as (weight * sum). This score can also be
                squared on a per-member basis, which provides tighter grouping.
                The distance calculations will skip comparisons against empty
                values.
            </p>
            <p>
                Positive weights mean you want that type of mapping to happen.
                Negative weights will try to avoid that type of mapping. Empty
                or non-weighted items are skipped.
            </p>
        `,
    },
    class {
        data: any[] = [];
        fields: { name: string; mapping: string; weight: number }[] = [];
        groups = 1;
        newPeopleWeight = 1;
        sessions = 1;

        onChange(propName: string) {
            if (propName === 'data') {
                this.fields = this.rebuildFields(this.data);
            }
        }

        setSessions(value: string) {
            this.sessions = parseInt(value, 10) || 1;
        }

        setGroups(value: string) {
            this.groups = parseInt(value, 10) || 1;
        }

        setWeight(value: string) {
            this.newPeopleWeight = parseInt(value, 10) || 1;
        }

        setFieldMapping(field: any, mapping: string) {
            field.mapping = mapping;
        }

        setFieldWeight(field: any, value: string) {
            field.weight = parseInt(value, 10) || 1;
        }

        emitConfig() {
            emit(this, 'config', {
                sessions: this.sessions,
                groups: this.groups,
                newPeopleWeight: this.newPeopleWeight,
                fields: this.fields,
            });
        }

        private rebuildFields(data: any[]) {
            if (!data) {
                return [];
            }

            return Object.keys(data[0]).map(field => ({
                name: field,
                mapping: 'IGNORE',
                weight: 1,
            }));
        }
    }
);
