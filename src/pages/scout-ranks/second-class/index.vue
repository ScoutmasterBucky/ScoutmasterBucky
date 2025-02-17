<page>
title: Second Class
</page>

<script setup lang="ts">
import requirements from '../../../../data/scout-ranks/second-class.yaml';
</script>

<template>
    <ScoutRankBucky rank="second-class" />

    <h3>Second Class Rank</h3>

    <p>All requirements for the Second Class rank must be completed as a member of a troop or as a Lone Scout.</p>

    <p>The requirements for Scout, Tenderfoot, Second Class, and First Class ranks may be worked on simultaneously; however, these ranks must be earned in sequence.</p>

    <p><a href="../alternative-requirements/">Alternate requirements for the Second Class rank</a> are available for Scouts with physical or mental disabilities if they meet the criteria listed in the <b>Scouts BSA Requirements</b> book.</p>

    <h2>Second Class Rank Requirements</h2>

    <Requirements :requirements="requirements" />
</template>
