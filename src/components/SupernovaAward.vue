<script setup lang="ts">
defineProps<{ supernova: String }>();
import supernovaAwards from '../../data/supernova-awards.json';
</script>

<template>
    <ScaledContent>
    <a :href="`/nova-lab/supernova/${supernova}/`">
        <img :src="`/nova-lab/supernova/${supernova}-medal.jpg`" class="wide" />
        <div class="name">{{ supernovaAwards[supernova].name }} Supernova Award</div>
    </a>
    </ScaledContent>
</template>

<style scoped>
a {
    text-decoration: none;
    display: block;
}

.name {
    text-align: center;
}
</style>
