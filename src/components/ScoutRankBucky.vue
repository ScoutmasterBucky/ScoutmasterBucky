<script setup lang="ts">
defineProps<{ rank: String }>();
import scoutRanks from '../../data/scout-ranks.json';
</script>

<template>
    <div>
        <img :src="scoutRanks[rank].bucky" class="wide">
    </div>
</template>

<style scoped>
div {
    display: flex;
    justify-content: center;
}
</style>
