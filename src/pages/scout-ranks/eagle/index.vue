<page>
title: Eagle
</page>

<script setup type="ts">
import requirements from "../../../../data/scout-ranks/eagle.yaml";
</script>

<template>
    <ScoutRankBucky rank="eagle" />

    <h3>Eagle Rank</h3>

    <p>A Venturer or Sea Scout must have achieved First Class rank as a Scouts BSA member, or as a Lone Scout, in order to work on and earn Star, Life, and Eagle Rank requirements. For Venturers working on Scouts BSA requirements, replace "troop" with "crew" and "Scoutmaster" with "Crew Advisor." For Sea Scouts working on Scouts BSA requirements, replace "troop" with "ship" and "Scoutmaster" with "Skipper."</p>

    <p><a href="../eagle-alternative-requirements/">Alternate requirements for the Eagle Scout rank</a> are available for Scouts with physical or mental disabilities if they meet the criteria listed in the <b>Scouts BSA Requirements</b> book.</p>

    <h2>Eagle Rank Requirements</h2>

    <Requirements :requirements="requirements" />
</template>
