<script setup lang="ts">
import testLab from '~/data/test-lab.json';
</script>

<template>
    <h2>Scouts BSA Test Lab</h2>
    <p>
        These are proposed topics for merit badges. Receive a certificate for
        completion of the requirements and automatically receive the merit badge
        if it becomes official. Get in on the action early and help shape the
        future of Scouting! Learn more about the
        <a href="https://www.scouting.org/skills/merit-badges/test-lab/"
            >Scouts BSA Test Lab</a
        >.
    </p>
    <TileWrapper>
        <TestLabTile v-for="(detail, id) in testLab" :id="id" />
    </TileWrapper>
</template>
