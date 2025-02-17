<page>
title: Totin' Chip
</page>

<script setup lang="ts">
import requirements from '../../../../data/other-awards/totin-chip.yaml';
</script>

<template>
    <OtherAwardBucky award="totin-chip" />

    <p>The Totin' Chip is awarded to Scouts that lean and demonstrate the proper ability to safely handle and use bladed tools.</p>

    <p>The privileges this awards grants are able to be taken away if the Scout fails in their responsibility.</p>

    <p>When earned, the Scout may receive the patch, the card, or both.</p>

    <div class="gallery">
        <img src="/other-awards/totin-chip-card-front.jpg">
    </div>

    <h3>Totin' Chip Requirements</h3>

    <Requirements :requirements="requirements" />
</template>

<style scoped>
.gallery {
    display: flex;
    justify-content: center;
}
</style>
