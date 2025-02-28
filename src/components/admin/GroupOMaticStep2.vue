<script setup lang="ts">
import { ref, watch } from 'vue';
const { data } = defineProps<{ data: Array }>();
const emit = defineEmits(['config']);
const sessions = ref(1);
const groups = ref(1);
const newPeopleWeight = ref(1);
const fields = ref(rebuildFields(data));
watch(
    () => data,
    () => (fields.value = rebuildFields(data))
);

function rebuildFields(d) {
    if (!d) {
        return [];
    }

    return Object.keys(d[0]).map(field => ({
        name: field,
        mapping: 'IGNORE',
        weight: 1,
    }));
}
</script>

<template>
    <h2>Step 2: Configuration</h2>

    <table>
        <tr>
            <th>Number of Sessions</th>
            <td><input type="number" v-model="sessions" /></td>
            <td>How many times participants will meet as groups</td>
        </tr>
        <tr>
            <th>Number of Groups</th>
            <td><input type="number" v-model="groups" /></td>
            <td>
                Total number of groups per session (participants will be divided
                evenly)
            </td>
        </tr>
        <tr>
            <th>Weight for new people in a group</th>
            <td><input type="number" v-model="newPeopleWeight" /></td>
            <td>
                Number of points to award for each new pairing of people in the
                groups. 0 means this is not important, 1 is typical, 100 would
                be quite extreme.
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
        <tr v-for="field in fields">
            <td>{{ field.name }}</td>
            <td>
                <select v-model="field.mapping">
                    <option value="IGNORE">Ignore</option>
                    <option value="MATCH">Add points for each match</option>
                    <option value="DIST">
                        Add points times distance from mean
                    </option>
                    <option value="DIST_SQ">
                        Add points times the squared distance from mean
                    </option>
                </select>
            </td>
            <td><input type="number" v-model="field.weight" /></td>
        </tr>
    </table>

    <button
        @click="emit('config', { sessions, groups, newPeopleWeight, fields })"
    >
        Use These Settings
    </button>

    <p>
        When matching values in a group, the weight is applied for each match.
        So, if your group had A B B C C, it would get the score of (weight * 2)
        because of the B+B and C+C pairs. If you want items to not match, use a
        negative weight.
    </p>
    <p>
        The distance from the mean numerical value is a sum of each member of
        the group and how far it is off from the mean. This sum is then scored
        as (weight * sum). This score can also be squared on a per-member basis,
        which provides tighter grouping. The distance calculations will skip
        comparisons against empty values.
    </p>
    <p>
        Positive weights mean you want that type of mapping to happen. Negative
        weights will try to avoid that type of mapping. Empty or non-weighted
        items are skipped.
    </p>
</template>
