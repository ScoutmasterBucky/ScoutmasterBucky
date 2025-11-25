import { component, emit, html } from 'fudgel';

class Series {
    sessions: Session[] = [];
    dataMap = new Map();
    newPeopleWeight = 0;

    constructor(config: any, data: any) {
        this.newPeopleWeight = config.newPeopleWeight;

        for (let i = 0; i < data.length; i += 1) {
            this.dataMap.set(data[i], i);
        }

        while (this.sessions.length < config.sessions) {
            this.sessions.push(
                new Session(
                    this.sessions.length + 1,
                    config.groups,
                    config.fields,
                    data
                )
            );
        }
    }

    toData() {
        return this.sessions.map(session => session.toData());
    }

    getScore() {
        return this.sessions.reduce((acc, next) => {
            return acc + next.getScore();
        }, this.scoreNewPeople());
    }

    scoreNewPeople() {
        let sum = 0;
        let pairings = new Map();

        for (const session of this.sessions) {
            for (const group of session.groups) {
                const l = group.members.length;

                for (let i = 0; i < l; i += 1) {
                    const iIndex = this.dataMap.get(group.members[i]);

                    for (let j = i + 1; j < l; j += 1) {
                        const jIndex = this.dataMap.get(group.members[j]);
                        const key =
                            iIndex < jIndex
                                ? `${iIndex} ${jIndex}`
                                : `${jIndex} ${iIndex}`;
                        pairings.set(key, true);
                    }
                }
            }
        }

        return pairings.size * this.newPeopleWeight;
    }
}

class Session {
    fields: any[] = [];
    groups: Group[] = [];
    sessionNumber = 0;

    constructor(
        sessionNumber: number,
        numberOfGroups: number,
        fields: any[],
        dataOriginal: any[]
    ) {
        this.sessionNumber = sessionNumber;
        this.fields = fields;
        const data = [...dataOriginal];

        while (this.groups.length < numberOfGroups) {
            this.groups.push(
                this.makeGroup(data, numberOfGroups - this.groups.length)
            );
        }
    }

    toData() {
        return this.groups.map(group => group.toData());
    }

    makeGroup(data: any[], groupsLeftToMake: number) {
        let desired = data.length / groupsLeftToMake;
        const group = new Group(this.groups.length + 1, this.fields);

        while (desired > 0) {
            const index = Math.floor(Math.random() * data.length);
            const member = data.splice(index, 1);
            group.addMember(member[0]);
            desired -= 1;
        }

        return group;
    }

    getScore() {
        return this.groups.reduce((acc, next) => {
            return acc + next.getScore();
        }, 0);
    }
}

class Group {
    fields: any[] = [];
    groupNumber = 0;
    members: any[] = [];

    constructor(groupNumber: number, fields: any[]) {
        this.groupNumber = groupNumber;
        this.fields = fields;
    }

    toData() {
        return this.members.map(member => member);
    }

    addMember(m: any) {
        this.members.push(m);
    }

    getScore() {
        return Object.values(this.fields).reduce((acc, next) => {
            return acc + this.scoreField(next);
        }, 0);
    }

    scoreField(field: any) {
        if (field.weight === 0 || field.mapping === 'IGNORE') {
            return 0;
        }

        switch (field.mapping) {
            case 'MATCH':
                return this.scoreFieldMatching(field);

            case 'DIST':
                return this.scoreFieldDistance(field, false);

            case 'DIST_SQ':
                return this.scoreFieldDistance(field, true);
        }

        return 0;
    }

    scoreFieldMatching(field: any) {
        let hits = 0;
        const l = this.members.length;

        for (let i = 0; i < l; i += 1) {
            const iMember = this.members[i];

            for (let j = i + 1; j < l; j += 1) {
                const jMember = this.members[j];

                if (iMember[field.name] === jMember[field.name]) {
                    hits += 1;
                }
            }
        }

        return hits * field.weight;
    }

    scoreFieldDistance(field: any, squared: boolean) {
        let sum = 0;
        let count = 0;

        for (const member of this.members) {
            const v = member[field.name];

            if (typeof v === 'number') {
                sum += v;
                count += 1;
            }
        }

        const mean = sum / count;
        let scoreSum = 0;

        for (const member of this.members) {
            const v = member[field.name];

            if (typeof v === 'number') {
                const distance = Math.abs(mean - v);
                const score = distance * field.weight;

                if (squared) {
                    const sign = score < 0 ? -1 : 1;
                    scoreSum += score * score * sign;
                } else {
                    scoreSum += score;
                }
            }
        }

        return scoreSum;
    }
}

component(
    'group-o-matic-step-3',
    {
        prop: [],
        template: html`
            <h2>Step 3: Configuration</h2>

            <button *if="running" @click="toggleRunning()">
                Stop Searching
            </button>
            <button *if="!running" @click="toggleRunning()">
                Start Searching
            </button>

            <table>
                <tr>
                    <th>Attempts</th>
                    <td>{{ attempts }}</td>
                </tr>
                <tr>
                    <th>Score</th>
                    <td>{{ bestScore }}</td>
                </tr>
            </table>
        `,
    },
    class {
        attempts = 0;
        bestScore = 0;
        bestSeries = null;
        data: any;
        config: any;
        running = false;

        onChange(propName: string) {
            if (propName === 'data' || propName === 'config') {
                this.attempts = 0;
                this.bestScore = 0;
            }
        }

        toggleRunning() {
            this.running = !this.running;

            if (this.running) {
                this.scheduleNextAttempt();
            }
        }

        private scheduleNextAttempt() {
            setTimeout(() => {
                const startTime = Date.now();
                let attemptsTried = 0;
                let newBestScore = this.bestScore;
                let newBestSeries = null;

                while (Date.now() - startTime < 45) {
                    const series = new Series(this.config, this.data);
                    const score = series.getScore();

                    if (score > newBestScore) {
                        newBestScore = score;
                        newBestSeries = series;
                    }

                    attemptsTried += 1;
                }

                this.attempts += attemptsTried;

                if (newBestSeries) {
                    this.bestScore = newBestScore;
                    emit(this, 'best', newBestSeries.toData());
                }

                if (this.running) {
                    this.scheduleNextAttempt();
                }
            });
        }
    }
);
