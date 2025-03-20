<page>
title: Totin' Chip
</page>

<script setup lang="ts">
import requirements from '~/data/other-awards/totin-chip.yaml';
</script>

<template>
    <ScaledContent align="center">
        <OtherAwardBucky award="totin-chip" />
    </ScaledContent>

    <p>The Totin' Chip is awarded to Scouts that learn and demonstrate the proper ability to safely handle and use bladed tools.</p>

    <p>The privileges this award grants are able to be taken away if the Scout fails in their responsibility.</p>

    <p>When earned, the Scout may receive the Totin Chip patch, the Totin Chip card, or both.</p>

    <h3>Totin' Chip Requirements</h3>

    <Requirements :requirements="requirements" />
</template>

<style scoped>
.gallery {
    display: flex;
    justify-content: center;
}
</style>
