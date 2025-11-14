<page>
title: Merit Badge Index
</page>

<script setup lang="ts">
import meritBadges from '~/data/merit-badges.json';
</script>

<template>
    <h1>List of Merit Badges</h1>

    <p>
        Find information and resources on each of the
        {{ Object.keys(meritBadges).length }} Scouts BSA merit badges offered by Scouting America. Biannual updates are released during the first
        quarter and third quarter of the year.
    </p>

    <p>
        The links below direct to the specific merit badge and its requirements
        as well as links to resources like the Scoutmaster Bucky Merit Badge
        Workbook and Class Preparation Pages.
    </p>

    <h2>Merit Badge Index</h2>

    <MeritBadgeList>
    <MeritBadge v-for="(badgeDetail, id) in meritBadges" :badge="id" />
    </MeritBadgeList>
</template>
