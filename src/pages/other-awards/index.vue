<page>
title: Other Scout Awards
</page>

<script setup lang="ts">
import otherAwards from '~/data/other-awards.json'
</script>

<template>
    <h1>Other Scout Awards</h1>

    <p>Beyond rank and merit badges, there are a number of other fun and interesting awards a Scout may earn. Some are quite easy, relative to merit badges and rank advancement, while others are extraordinarily difficult and time consuming.</p>

    <p>Shown here are some of these additional awards and recognitions a Scout may earn. Some of these are taken from the <strong>2025 Scouting America Requirements</strong> book, and are noted accordingly. Others are from National BSA communications and documentation.</p>

    <h2>List of Awards</h2>

    <MeritBadgeList>
        <OtherAward v-for="award in Object.keys(otherAwards)" :award="award" />
    </MeritBadgeList>
</template>
