<script setup lang="ts">
defineProps<{ award: String }>();
import otherAwards from '~/data/other-awards.json';
</script>

<template>
    <div>
        <img :src="otherAwards[award].bucky" class="wide">
    </div>
</template>

<style scoped>
div {
    display: flex;
    justify-content: center;
}
</style>
