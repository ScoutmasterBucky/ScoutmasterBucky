<page>
title: Tenderfoot
</page>

<script setup lang="ts">
import requirements from '~/data/scout-ranks/tenderfoot.yaml';
</script>

<template>
    <ScaledContent align="center">
        <ScoutRankBucky rank="tenderfoot" />
    </ScaledContent>

    <h3>Tenderfoot Rank</h3>

    <p>All requirements for the Tenderfoot rank must be completed as a member of a troop or as a Lone Scout.</p>

    <p>The requirements for Scout, Tenderfoot, Second Class, and First Class ranks may be worked on simultaneously; however, these ranks must be earned in sequence.</p>

    <p><a href="../alternative-requirements/">Alternate requirements for the Tenderfoot rank</a> are available for Scouts with physical or mental disabilities if they meet the criteria listed in the <b>Scouts BSA Requirements</b> book.</p>

    <h2>Tenderfoot Rank Requirements</h2>

    <Requirements :requirements="requirements" />
</template>
