<page>
title: Scout
</page>

<script setup lang="ts">
import requirements from '../../../../data/scout-ranks/scout.yaml';
</script>

<template>
    <ScoutRankBucky rank="scout" />

    <h3>Scout Rank</h3>

    <p>All requirements for the Scout rank must be completed as a member of a troop or as a Lone Scout.  If you have already completed these requirements as part of the Webelos Scouting Adventure, simply demonstrate your knowledge or skills to your Scoutmaster or other designated leader after joining the troop.</p>

    <p>The requirements for Scout, Tenderfoot, Second Class, and First Class ranks may be worked on simultaneously; however, these ranks must be earned in sequence.</p>

    <p><a href="../alternative-requirements/">Alternate requirements for the Scout rank</a> are available for Scouts with physical or mental disabilities if they meet the criteria listed in the <b>Scouts BSA Requirements</b> book.</p>

    <h2>Scout Rank Requirements</h2>

    <Requirements :requirements="requirements" />
</template>
