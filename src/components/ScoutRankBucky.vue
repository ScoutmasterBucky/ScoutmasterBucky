<script setup lang="ts">
defineProps<{ rank: String }>();
import scoutRanks from '../../data/scout-ranks.json';
</script>

<template>
    <div>
        <img :src="scoutRanks[rank].bucky">
    </div>
</template>

<style scoped>
div {
    display: flex;
    justify-content: center;
}

img {
    max-width: 100%;
}
</style>
