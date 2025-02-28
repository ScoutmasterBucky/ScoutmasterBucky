<script setup lang="ts">
import { ref, watch } from 'vue';
const { data, config } = defineProps<{ data: Array, config: Object }>();
const emit = defineEmits(['best']);
const running = ref(false);
const reset = () => {
    running.value = false;
    attempts.value = 0;
    bestScore.value = 0;
};
watch(
    () => data, reset
);
watch(
    () => config, reset
);

const attempts = ref(0);
const bestScore = ref(0);
const bestSeries = ref(null);

function scheduleNextAttempt() {
    setTimeout(() => {
        const startTime = Date.now();
        let attemptsTried = 0;
        let newBestScore = bestScore.value;
        let newBestSeries = null;

        while (Date.now() - startTime < 45) {
            const series = new Series(
                config,
                data
            );
            const score = series.getScore();

            if (score > newBestScore) {
                newBestScore = score;
                newBestSeries = series;
            }

            attemptsTried += 1;
        }

        attempts.value += attemptsTried;

        if (newBestSeries) {
            bestScore.value = newBestScore;
            bestSeries.value = newBestSeries;
            emit('best', newBestSeries.toData());
        }

        if (running.value) {
            scheduleNextAttempt();
        }
    });
}

class Series {
    sessions = [];
    dataMap = new Map();

    constructor(
        config, data
    ) {
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
        return this.sessions.map((session) => session.toData());
    }

    getScore() {
        return this.sessions.reduce((acc, next) => {
            return acc + next.getScore(this);
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
    groups = [];

    constructor(sessionNumber, numberOfGroups, fields, dataOriginal) {
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
        return this.groups.map((group) => group.toData());
    }

    makeGroup(data, groupsLeftToMake) {
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
    members = [];

    constructor(groupNumber, fields) {
        this.groupNumber = groupNumber;
        this.fields = fields;
    }

    toData() {
        return this.members.map((member) => member);
    }

    addMember(m) {
        this.members.push(m);
    }

    getScore() {
        return Object.values(this.fields).reduce((acc, next) => {
            return acc + this.scoreField(next);
        }, 0);
    }

    scoreField(field) {
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

    scoreFieldMatching(field) {
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

    scoreFieldDistance(field, squared) {
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
</script>

<template>
    <h2>Step 3: Configuration</h2>

    <button v-if="running" @click="running = false">Stop Searching</button>
    <button v-if="!running" @click="running = true; scheduleNextAttempt()">Start Searching</button>

    <table>
        <tr><th>Attempts</th><td>{{ attempts }}</td></tr>
        <tr><th>Score</th><td>{{ bestScore }}</td></tr>
    </table>
</template>

<style scoped></style>
