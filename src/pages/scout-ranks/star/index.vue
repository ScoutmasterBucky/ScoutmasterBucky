<page>
title: Star
</page>

<script setup lang="ts">
import requirements from '../../../../data/scout-ranks/star.yaml';
</script>

<template>
    <ScoutRankBucky rank="star" />

    <h3>Star Rank</h3>

    <p>A Venturer or Sea Scout must have achieved First Class rank as a Scouts BSA member, or as a Lone Scout, in order to work on and earn Star, Life, and Eagle Rank requirements. For Venturers working on Scouts BSA requirements, replace "troop" with "crew" and "Scoutmaster" with "Crew Advisor." For Sea Scouts working on Scouts BSA requirements, replace "troop" with "ship" and "Scoutmaster" with "Skipper."</p>

    <h2>Star Rank Requirements</h2>

    <Requirements :requirements="requirements" />
</template>
