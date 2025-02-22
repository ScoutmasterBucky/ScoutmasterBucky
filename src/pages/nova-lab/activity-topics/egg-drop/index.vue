<page>
title: "Design and Redesign: Egg Drop Contest"
layout: nova
</page>

<script setup lang="ts">
import requirementsPart1 from '../../../../../data/nova-lab/activity-topics/egg-drop-part-1.yaml';
import requirementsPart2 from '../../../../../data/nova-lab/activity-topics/egg-drop-part-2.yaml';
</script>

<template>
    <ActivityTopicPreamble />

    <h2>Design and Redesign: Egg Drop Contest</h2>

    <p>
        This is a group activity and requires at least two youth. Your task is
        to design a container in which to place a raw egg, so that when the
        container with the egg is dropped, the egg survives the impact without
        breaking.
    </p>

    <h3>Part 1: Research, Design, and Contest Set-Up</h3>

    <p>Research and describe to your mentor:</p>

    <Requirements :requirements="requirementsPart1" />

    <h3>Part 2: Analysis, Redesign, and Report</h3>

    <p>
        Analyze how your container performed, and discuss with your mentor your
        design strategy and how well the container you designed performed. Then
        do the following:
    </p>

    <Requirements :requirements="requirementsPart2" />
</template>
