<script setup lang="ts">
const { nova, program, requirements } = defineProps<{
    nova: String;
    program: String;
    requirements: Object;
}>();
import novaAwards from '../../data/nova-awards.json';
const award = novaAwards[program][nova];
</script>

<template>
    <slot />

    <h1>{{ award.name }}</h1>

    <p v-if="award.lastUpdate"><em>Requirements last updated {{ award.lastUpdate }}.</em></p>

    <Requirements :requirements="requirements" />
</template>
