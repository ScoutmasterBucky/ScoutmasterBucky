<script setup lang="ts">
import { ref, watch } from 'vue';
const { best } = defineProps<{ best: Array }>();
const fields = ref([]);
const updateFields = () => {
    fields.value = Object.keys(best[0][0][0]);
};
updateFields();
watch(() => best, updateFields);
</script>

<template>
    <h2>Group Results</h2>

    <div v-for="(session, sessionIndex) in best">
        <h3>Session {{ sessionIndex + 1 }}</h3>

        <div v-for="(group, groupIndex) in session">
            <p>Group {{ groupIndex + 1 }}</p>

            <table>
                <tr>
                    <th v-for="field in fields">{{ field }}</th>
                </tr>
                <tr v-for="record in group">
                    <td v-for="field in fields">{{ record[field] }}</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<style scoped></style>
