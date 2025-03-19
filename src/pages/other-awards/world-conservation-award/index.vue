<page>
title: World Conservation Award
</page>

<script setup lang="ts">
import requirements from '~/data/other-awards/world-conservation-award.yaml';
</script>

<template>
    <ScaledContent align="center">
        <OtherAwardBucky award="world-conservation-award" />
    </ScaledContent>

    <h3>World Conservation Award</h3>

    <p>The World Conservation Award provides an opportunity for individual Wolf Scouts, Bear Scouts, Webelos Scouts, Scouts BSA, Sea Scouts, and Venturers to “think globally” and “act locally” to conserve and improve our environment. This program is designed to make youth members aware that all nations are closely related through natural resources , and that we and our world environment are interdependent.</p>

    <p><i>The emblem is worn centered on the right pocket of the Scout uniform shirt as a temporary patch or may be placed on the back of the merit badge sash.</i></p>

    <p>Upon successful completion, participants earn the Whitewater Rafting patch along with their achievement card. Completion indicates the individual has experienced a valuable introduction to whitewater rafting.</p>

    <p>
        For more information and the award application, go to
        <a href="https://www.scouting.org/wp-content/uploads/2019/10/World_Conservation_Application-Scouts-BSA-1.pdf">Scouts BSA World Conservation Award</a>.
    </p>

    <h2>World Conservation Award Requirements</h2>

    <Requirements :requirements="requirements" />
</template>

<style scoped>
.gallery {
    display: flex;
    justify-content: center;
    align-items: center;
}

@media (max-width: 768px) {
    .gallery {
        flex-direction: column;
    }
}

.gallery img {
    max-width: 100%;
}
</style>
