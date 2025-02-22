<script setup lang="ts">
const { nova, program, requirements } = defineProps<{
    nova: String;
    program: String;
    requirements: Object;
}>();
import novaAwards from '~/data/nova-awards.json';
const award = novaAwards[program][nova];
</script>

<template>
    <slot />

    <h1>{{ award.name }}</h1>

    <p v-if="award.lastUpdate"><em>Requirements last updated {{ award.lastUpdate }}. There are broken links and outdated information in places and formatting may not match between two Nova awards because the requirements are preserved to match the original state from Scouting America. Where available, the related counselor notes have been included along with the requirements.</em></p>

    <Requirements :requirements="requirements" />
</template>
