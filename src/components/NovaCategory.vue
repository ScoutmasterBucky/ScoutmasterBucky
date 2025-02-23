<script setup lang="ts">
const { program, topic } = defineProps<{
    program: String;
    topic: String;
}>();
import novaAwards from '~/data/nova-awards.json';
const filteredNovaAwards = [];
for (const [nova, award] of Object.entries(novaAwards[program])) {
    if (award.topic === topic) {
        filteredNovaAwards.push({
            ...award,
            nova,
        });
    }
}
</script>

<template>
    <ul>
        <li v-for="(award, nova) in filteredNovaAwards">
            <a :href="`/nova-lab/${program}/${award.nova}/`">{{
                award.name
            }}</a>
            - {{ award.summary }}
        </li>
    </ul>
</template>
