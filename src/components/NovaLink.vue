<script setup lang="ts">
const { nova, program } = defineProps<{
    nova: String;
    program: String;
}>();
import novaAwards from '~/data/nova-awards.json';
const award = novaAwards[program][nova];
</script>

<template>
    <a :href="`/nova-lab/${program}/${nova}/`">{{ award.name }}</a>
</template>
