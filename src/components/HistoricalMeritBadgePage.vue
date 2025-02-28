<script setup lang="ts">
const { badge } = defineProps<{
    badge: String;
}>();
import meritBadges from '~/data/historical-merit-badges.json';
const info = meritBadges[badge];
</script>

<template>
    <h1>{{ info.name }} Merit Badge History</h1>

    <slot />
</template>
