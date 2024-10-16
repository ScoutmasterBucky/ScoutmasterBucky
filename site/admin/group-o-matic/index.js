const ROUTE_RESTART = '/restart';
const ROUTE_REPORT = '/report';
const ROUTE_START = '/start';
const ROUTE_CONFIGURE = '/configure';
const ROUTE_SEARCH = '/search';

const SS_CSV = 'csv';
const SS_SESSIONS = 'sessions';
const SS_PARAMS = 'params';

const ACTIONS = {
    N: 'Do not weigh groupings with this field',
    M: 'Matching values in the group',
    D: 'Distance from the mean numerical value',
    S: 'Distance from the mean, squared'
};

function parseCsv(csv) {
    return Papa.parse(csv, {
        dynamicTyping: true,
        header: true
    });
}

function parseNumber(n) {
    const i = parseInt(n);

    if (i === i) {
        return i;
    }

    return n;
}

function getFieldData(index, fieldName, data, actions) {
    let min = Number.POSITIVE_INFINITY;
    let max = Number.NEGATIVE_INFINITY;
    let sum = 0;
    let values = 0;

    for (const row of data) {
        const v = row[fieldName];

        if (typeof v === 'number') {
            if (v < min) {
                min = v;
            }

            if (v > max) {
                max = v;
            }

            sum += v;
            values += 1;
        }
    }

    return {
        index,
        name: fieldName,
        min,
        max,
        sum,
        mean: sum / values,
        numericalValues: values,
        action: getParam(`f${index}a`, 'N', Object.keys(ACTIONS)),
        weight: getParam(`f${index}w`, 0)
    };
}

// Either a number or a string value from an enum
function getParam(name, defaultValue, allowedValues) {
    const v = m.route.param(name);

    if (allowedValues) {
        if (allowedValues.indexOf(v) === -1) {
            return defaultValue;
        }

        return v;
    }

    if (v === undefined) {
        return defaultValue;
    }

    const n = parseInt(v);

    if (n === n) {
        return n;
    }

    return defaultValue;
}

const Restart = {
    render() {
        if (sessionStorage.getItem(SS_SESSIONS)) {
            m.route.set(ROUTE_REPORT);
        } else if (sessionStorage.getItem(SS_CSV)) {
            m.route.set(ROUTE_CONFIGURE);
        } else {
            m.route.set(ROUTE_START);
        }
    }
};

class Start {
    constructor() {
        sessionStorage.removeItem(SS_CSV);
    }

    dragEnter(e) {
        e.stopPropagation();
        e.preventDefault();
    }

    dragOver(e) {
        e.stopPropagation();
        e.preventDefault();
    }

    drop(e) {
        e.stopPropagation();
        e.preventDefault();
        const files = e.dataTransfer.files;

        if (!files[0]) {
            alert(
                'No files were dragged to the page - try again and wait a couple seconds before letting go'
            );

            return;
        }

        this.read(files[0]);
    }

    read(file) {
        const reader = new FileReader();
        reader.onabort = function () {
            alert('Read aborted');
        };
        reader.onerror = function () {
            alert('Read error');
        };
        reader.onload = function () {
            const data = reader.result
                .replace(/\r/g, '\n')
                .replace(/\n\n+/g, '\n')
                .replace(/$/, '\n')
                .replace(/\n(( *,)+\n)+/g, '\n')
                .replace(/\n+$/, '');
            console.log(data);
            const parsed = Papa.parse(data, {
                dynamicTyping: true,
                header: true
            });

            if (parsed.errors.length) {
                alert('Error parsing CSV file');
                console.log(parsed.errors);

                return;
            }

            // CSV is much smaller than JSON of the parsed CSV
            sessionStorage.setItem(SS_CSV, data);
            m.route.set(ROUTE_CONFIGURE);
        };
        reader.readAsText(file);
    }

    view() {
        return [
            m(
                'div',
                {
                    class: 'Bdw(3px) Bdc(#7f7f7f) Bds(da) P(1em)',
                    ondragenter: (e) => this.dragEnter(e),
                    ondragover: (e) => this.dragOver(e),
                    ondrop: (e) => this.drop(e)
                },
                [m('p', 'Drag CSV of participants here to start grouping')]
            ),
            m(
                'p',
                'The CSV file will be scanned for fields that you can use to make your groupings.'
            )
        ];
    }
}

class Configure {
    constructor() {
        const data = sessionStorage.getItem(SS_CSV);
        this.parsed = parseCsv(data);
        this.participants = this.parsed.data.length;
        const fieldsArray = [...this.parsed.meta.fields.entries()];
        this.fields = fieldsArray.map(([index, fieldName]) =>
            getFieldData(index, fieldName, this.parsed.data)
        );
        this.sessions = getParam('s', 1);
        this.groups = getParam('g', 1);
        this.newPeopleWeight = getParam('np', 1);
        this.calculate();
        this.setRouteParams();
    }

    getParams() {
        const params = {
            s: this.sessions,
            g: this.groups,
            np: this.newPeopleWeight
        };

        for (const field of this.fields) {
            params[`f${field.index}a`] = field.action;
            params[`f${field.index}w`] = field.weight;
        }

        return params;
    }

    setRouteParams() {
        m.route.set(ROUTE_CONFIGURE, this.getParams(), true);
    }

    setGroups(inStr) {
        this.groups = parseNumber(inStr);
        this.setRouteParams();
        this.calculate();
    }

    setNewPeople(inStr) {
        this.newPeopleWeight = parseNumber(inStr);
        this.setRouteParams();
        this.calculate();
    }

    setSessions(inStr) {
        this.sessions = parseNumber(inStr);
        this.setRouteParams();
        this.calculate();
    }

    isValidGroupInput() {
        if (
            typeof this.groups !== 'number' ||
            this.groups < 1 ||
            typeof this.sessions !== 'number' ||
            this.sessions < 1
        ) {
            return false;
        }

        return true;
    }

    calculate() {
        if (this.isValidGroupInput()) {
            const ppg = this.participants / this.groups;
            this.participantsPerGroupMax = Math.ceil(ppg);
            this.participantsPerGroupMin = Math.floor(ppg);
        } else {
            this.participantsPerGroupMax = null;
            this.participantsPerGroupMin = null;
        }
    }

    showParticipantsPerGroup() {
        if (this.participantsPerGroupMax === this.participantsPerGroupMin) {
            return this.participantsPerGroupMax;
        }

        return `${this.participantsPerGroupMin} - ${this.participantsPerGroupMax}`;
    }

    startSearch() {
        m.route.set(ROUTE_SEARCH, this.getParams());
    }

    view() {
        return [
            m(m.route.Link, { href: ROUTE_START }, 'Start over'),
            m('table', [
                m('tr', [
                    m('td', 'Number of Sessions'),
                    m('input[type=text]', {
                        class: 'W(3em)',
                        value: this.sessions,
                        oninput: (e) => this.setSessions(e.target.value)
                    })
                ]),
                m('tr', [
                    m('td', 'Number of Groups'),
                    m('input[type=text]', {
                        class: 'W(3em)',
                        value: this.groups,
                        oninput: (e) => this.setGroups(e.target.value)
                    })
                ]),
                m('tr', [
                    m('td', 'Weight for new people in a group'),
                    m('input[type=text]', {
                        class: 'W(3em)',
                        value: this.newPeopleWeight,
                        oninput: (e) => this.setNewPeople(e.target.value)
                    })
                ])
            ]),
            m('hr'),
            m('table', [
                m('tr', [m('td', 'Number of Participants'), this.participants]),
                m('tr', [
                    m('td', 'Participants per Group'),
                    this.showParticipantsPerGroup()
                ])
            ]),
            m('hr'),
            m('table', [
                m('tr', [
                    m('th', 'Field Name'),
                    m('th', 'Mapping'),
                    m('th', 'Weight')
                ]),
                this.fields.map((field) => this.viewField(field))
            ]),
            m(
                'div',
                m(
                    'button',
                    {
                        disabled: !this.isValidGroupInput(),
                        onclick: () => this.startSearch()
                    },
                    'Start Searching For Good Groupings'
                )
            ),
            m(
                'p',
                'When matching values in a group, the weight is applied for each match. So, if your group had A B B C C, it would get the score of (weight * 2) because of the B+B and C+C pairs. If you want items to not match, use a negative weight.'
            ),
            m(
                'p',
                'The distance from the mean numerical value is a sum of each member of the group and how far it is off from the mean. This sum is then scored as (weight * sum). This score can also be squared on a per-member basis, which provides tighter grouping. The distance calculations will skip comparisons against empty values.'
            ),
            m(
                'p',
                'Positive weights mean you want that type of mapping to happen. Negative weights will try to avoid that type of mapping. Empty or non-weighted items are skipped.'
            )
        ];
    }

    viewField(field) {
        return m('tr', [
            m('td', field.name),
            m(
                'td',
                m(
                    'select',
                    {
                        value: field.action,
                        onchange: (e) => {
                            field.action = e.target.value;
                            this.setRouteParams();
                        }
                    },
                    Object.entries(ACTIONS).map(([key, value]) => {
                        return m(
                            'option',
                            { value: key, selected: field.action === key },
                            value
                        );
                    })
                )
            ),
            m(
                'td',
                m('input[type=text]', {
                    class: 'W(3em)',
                    value: field.weight,
                    oninput: (e) => {
                        field.weight = parseNumber(e.target.value);
                        this.setRouteParams();
                    }
                })
            )
        ]);
    }
}

class Search {
    constructor() {
        const data = sessionStorage.getItem(SS_CSV);
        this.parsed = parseCsv(data);
        this.participants = this.parsed.data.length;
        const fieldsArray = [...this.parsed.meta.fields.entries()];
        this.fields = fieldsArray.map(([index, fieldName]) =>
            getFieldData(index, fieldName, this.parsed.data)
        );
        this.sessions = getParam('s', 1);
        this.groups = getParam('g', 1);
        this.newPeopleWeight = getParam('np', 1);
        this.attempts = 0;
        this.bestScore = Number.NEGATIVE_INFINITY;
        this.bestSeries = null;
        this.scheduleNextAttempt();
    }

    scheduleNextAttempt() {
        const attemptsMax = 250000;
        setTimeout(() => {
            const startTime = Date.now();

            while (Date.now() - startTime < 45 && this.attempts < attemptsMax) {
                this.attemptNewGroupings();
            }

            m.redraw();

            if (this.attempts < attemptsMax) {
                this.scheduleNextAttempt();
            }
        });
    }

    attemptNewGroupings() {
        this.attempts += 1;
        const series = new Series(
            this.sessions,
            this.groups,
            this.parsed.data,
            this.fields,
            this.newPeopleWeight
        );
        const score = series.getScore();

        if (this.bestScore < score) {
            this.bestScore = score;
            this.bestSeries = series;
        }
    }

    getParams() {
        const params = {
            s: this.sessions,
            g: this.groups,
            np: this.newPeopleWeight
        };

        for (const field of this.fields) {
            params[`f${field.index}a`] = field.action;
            params[`f${field.index}w`] = field.weight;
        }

        return params;
    }

    commit() {
        sessionStorage.setItem(SS_PARAMS, m.buildQueryString(this.getParams()));
        sessionStorage.setItem(
            SS_SESSIONS,
            JSON.stringify(this.bestSeries.toData(this.parsed.data))
        );
        m.route.set(ROUTE_REPORT);
    }

    view() {
        return [
            m('div', [
                m(m.route.Link, { href: ROUTE_START }, 'Start over'),
                ' - ',
                m(
                    m.route.Link,
                    {
                        href:
                            ROUTE_CONFIGURE +
                            '?' +
                            m.buildQueryString(this.getParams())
                    },
                    'Reconfigure'
                )
            ]),
            m('table', [
                m('tr', [m('td', 'Best Total Score'), m('td', this.bestScore)]),
                m('tr', [m('td', 'Attempts'), m('td', this.attempts)])
            ]),
            m(
                'div',
                m(
                    'button',
                    { onclick: () => this.commit() },
                    'Commit Groupings'
                )
            ),
            this.bestSeries ? this.bestSeries.view() : null
        ];
    }
}

class Series {
    sessions = [];
    dataMap = new Map();

    constructor(
        numberOfSessions,
        numberOfGroups,
        data,
        fields,
        newPeopleWeight
    ) {
        this.newPeopleWeight = newPeopleWeight;

        for (let i = 0; i < data.length; i += 1) {
            this.dataMap.set(data[i], i);
        }

        while (this.sessions.length < numberOfSessions) {
            this.sessions.push(
                new Session(
                    this.sessions.length + 1,
                    numberOfGroups,
                    data,
                    fields
                )
            );
        }
    }

    toData(data) {
        return this.sessions.map((session) => session.toData(data));
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

    view() {
        return [
            m(
                'p',
                `Series: ${this.getScore()} overall, ${this.scoreNewPeople()} for new people`
            ),
            this.sessions.map((session) => session.view())
        ];
    }
}

class Session {
    groups = [];

    constructor(sessionNumber, numberOfGroups, dataOriginal, fields) {
        this.sessionNumber = sessionNumber;
        this.fields = fields;
        const data = [...dataOriginal];

        while (this.groups.length < numberOfGroups) {
            this.groups.push(
                this.makeGroup(data, numberOfGroups - this.groups.length)
            );
        }
    }

    toData(data) {
        return this.groups.map((group) => group.toData(data));
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

    view() {
        return [
            m(
                'p',
                { class: 'Fw(b)' },
                `Session ${this.sessionNumber}: ${this.getScore()}`
            ),
            m(
                'div',
                { class: 'Pstart(1em)' },
                this.groups.map((group) => group.view())
            )
        ];
    }
}

class Group {
    members = [];

    constructor(groupNumber, fields) {
        this.groupNumber = groupNumber;
        this.fields = fields;
    }

    toData(data) {
        return this.members.map((member) => data.indexOf(member));
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
        if (field.weight === 0 || field.action === 'N') {
            return 0;
        }

        switch (field.action) {
            case 'M':
                return this.scoreFieldMatching(field);

            case 'D':
                return this.scoreFieldDistance(field, false);

            case 'S':
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

    view() {
        return [
            m('p', `Group ${this.groupNumber}: ${this.getScore()}`),
            m('table', [
                this.viewFieldHeadings(),
                this.members.map((member) => this.viewMember(member))
            ])
        ];
    }

    viewFieldHeadings() {
        return m('tr', [
            Object.values(this.fields).map((field) => m('th', field.name))
        ]);
    }

    viewMember(member) {
        return m('tr', [
            Object.values(this.fields).map((field) =>
                m('td', member[field.name])
            )
        ]);
    }
}

class Report {
    constructor() {
        const data = sessionStorage.getItem(SS_CSV);
        this.parsed = parseCsv(data);
        this.sessions = JSON.parse(sessionStorage.getItem(SS_SESSIONS));
        this.paramsQueryString = sessionStorage.getItem(SS_PARAMS);
        this.labels = {};
        this.groupsForParticipant = this.buildGroupsForParticipant();

        for (
            let sessionIndex = 0;
            sessionIndex < this.sessions.length;
            sessionIndex += 1
        ) {
            for (
                let groupIndex = 0;
                groupIndex < this.sessions[sessionIndex].length;
                groupIndex += 1
            ) {
                const key = `${sessionIndex}_${groupIndex}`;
                this.labels[key] = m.route.param(key) || '';
            }
        }
    }

    buildGroupsForParticipant() {
        const m = new Map();

        for (const entry of this.parsed.data) {
            m.set(entry, []);
        }

        [...this.sessions.entries()].forEach(([sessionIndex, groups]) => {
            [...groups.entries()].forEach(([groupIndex, members]) => {
                const key = `${sessionIndex}_${groupIndex}`;

                for (const member of members) {
                    const entry = this.parsed.data[member];
                    (m.get(entry) || []).push(key);
                }
            });
        });

        return m;
    }

    updateRoute() {
        m.route.set(ROUTE_REPORT, this.labels, true);
    }

    view() {
        return [
            m('div', { class: 'D(n)--p' }, [
                m(m.route.Link, { href: ROUTE_START }, 'Start over'),
                ' - ',
                m(
                    m.route.Link,
                    {
                        href: ROUTE_CONFIGURE + '?' + this.paramsQueryString
                    },
                    'Reconfigure'
                )
            ]),
            m('div', { class: 'D(n)--p' }, this.viewSessionLabels()),
            this.viewParticipantReport(),
            this.viewGroupLabelSummary(),
            this.viewSessionLeaderReports()
        ];
    }

    viewSessionLabels() {
        return [...this.sessions.entries()].map(([index, groups]) => {
            return [
                m('p', { class: 'Fw(b)' }, `Session ${index + 1}`),
                m('table', this.viewGroupLabels(index, groups))
            ];
        });
    }

    viewGroupLabels(sessionIndex, groups) {
        return [...groups.entries()].map(([groupIndex, group]) => {
            const key = `${sessionIndex}_${groupIndex}`;

            return m('tr', [
                m('td', `Group ${groupIndex + 1}`),
                m(
                    'td',
                    m('input[type=text]', {
                        class: 'W(6em)',
                        value: this.labels[key] || '',
                        oninput: (e) => {
                            this.labels[key] = e.target.value;
                            this.updateRoute();
                        }
                    })
                )
            ]);
        });
    }

    viewParticipantReport() {
        return [m('h1', 'Participants'), this.viewMembers(this.parsed.data)];
    }

    viewGroupLabelSummary() {
        const sessionNumbers = [...this.sessions.entries()].map((e) => e[0]);
        const groupNumbers = [...this.sessions[0].entries()].map((e) => e[0]);

        return [
            m('h1', 'Group Labels'),
            m('table', [
                m('tr', [
                    m('td'),
                    sessionNumbers.map((sessionIndex) =>
                        m('th', `Session ${sessionIndex + 1}`)
                    )
                ]),
                groupNumbers.map((groupIndex) =>
                    m('tr', [
                        m('th', `Group ${groupIndex + 1}`),
                        sessionNumbers.map(
                            (sessionIndex) =>
                                m('td', this.labels[`${sessionIndex}_${groupIndex}`])
                        )
                    ])
                )
            ])
        ];
    }

    viewMembers(members) {
        const fields = this.parsed.meta.fields;

        return m('table', [
            m('tr', [fields.map((field) => m('th', field)), m('th', 'Groups')]),
            members.map((entry) => {
                return m('tr', [
                    fields.map((field) => m('td', entry[field])),
                    m('td', this.getGroupLabelsForParticipant(entry))
                ]);
            })
        ]);
    }

    getGroupLabelsForParticipant(entry) {
        return this.groupsForParticipant
            .get(entry)
            .map((key) => this.labels[key])
            .join(' ');
    }

    viewSessionLeaderReports() {
        const groupsShuffled = [];

        for (const groups of this.sessions) {
            for (const [groupIndex, members] of groups.entries()) {
                if (!groupsShuffled[groupIndex]) {
                    groupsShuffled[groupIndex] = [];
                }

                groupsShuffled[groupIndex].push(members);
            }
        }

        return [...groupsShuffled.entries()].map(
            ([groupIndex, groupShuffled]) =>
                this.viewSessionLeaderReport(groupIndex, groupShuffled)
        );
    }

    viewSessionLeaderReport(groupIndex, groupShuffled) {
        return m('div', { style: 'page-break-before: always' }, [
            m('h1', `Sessions for Group ${groupIndex + 1}`),
            [...groupShuffled.entries()].map(([sessionIndex, members]) =>
                this.viewSessionReport(sessionIndex, groupIndex, members)
            )
        ]);
    }

    viewSessionReport(sessionIndex, groupIndex, members) {
        const key = `${sessionIndex}_${groupIndex}`;
        const membersReal = members.map((index) => this.parsed.data[index]);

        return [
            m('p', `Session ${sessionIndex + 1}: ${this.labels[key]}`),
            this.viewMembers(membersReal)
        ];
    }
}

window.addEventListener('load', () => {
    m.route(document.getElementById('module'), ROUTE_RESTART, {
        [ROUTE_RESTART]: Restart,
        [ROUTE_START]: Start,
        [ROUTE_CONFIGURE]: Configure,
        [ROUTE_SEARCH]: Search,
        [ROUTE_REPORT]: Report
    });
});
