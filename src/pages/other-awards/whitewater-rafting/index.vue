<page>
title: Whitewater Rafting
</page>

<script setup lang="ts">
import requirements from '~/data/other-awards/whitewater-rafting.yaml';
</script>

<template>
    <ScaledContent align="center">
        <OtherAwardBucky award="whitewater-rafting" />
    </ScaledContent>

    <h3>Whitewater Rafting</h3>

    <p>This award is available to Scouting America members, Venturers, Sea Scouts, and Explorers, and adult leaders in these programs. Any adult leader, approved by the council, who is trained in Safety Afloat and can personally verify that all instruction and skill completions were directly supervised by a professionally trained or licensed rafting guide may serve as a counselor for this award. Such guides may be employed by council high-adventure programs or commercial outfitters. Guidance for selecting a reputable rafting service is provided in the *Aquatics Supervision* publication, No. 34346.</p>

    <p><i>Swimsuit / swim trunks emblem - The Whitewater Rafting patch is NOT worn on the uniform or the sash; it is worn on the left side of the swimsuit / swim trunks.</i></p>

    <p>Upon successful completion, participants earn the Whitewater Rafting patch along with their achievement card. Completion indicates the individual has experienced a valuable introduction to whitewater rafting.</p>

    <p>
        For more information and the award application, read
        <a href="../aquatics-guide.pdf">Aquatics Supervision - Leader's Guide</a
        >. The award application is contained in the appendix.
    </p>

    <h2>Whitewater Rafting Requirements</h2>

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
