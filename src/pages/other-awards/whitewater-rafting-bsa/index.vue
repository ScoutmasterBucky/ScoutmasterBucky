<page>
title: Whitewater Rafting BSA
</page>

<script setup lang="ts">
import requirements from '~/data/other-awards/whitewater-rafting-bsa.yaml';
</script>

<template>
    <ScaledContent align="center">
        <OtherAwardBucky award="whitewater-rafting-bsa" />
    </ScaledContent>

    <h3>Whitewater Rafting BSA</h3>

    <p>This award is available to BSA youth and adults who are members of Boy Scout, Venturing, or Sea Scout units. Any adult leader, approved by the council, who is trained in Safety Afloat and can personally verify that all instruction and skill completions were directly supervised by a professionally trained or licensed rafting guide may serve as a counselor for this award. Such guides may be employed by council high-adventure programs or commercial outfitters. Guidance for selecting a reputable rafting service is provided in the BSA publication *Aquatics Supervision*, No. 34346.</p>

    <p><i>Swimsuit / swim trunks emblem - The Whitewater Rafting BSA patch is NOT worn on the uniform or the sash; it is worn on the left side of the swimsuit / swim trunks.</i></p>

    <p>Upon successful completion, participants earn the Whitewater Rafting BSA patch along with their achievement card. Completion indicates the individual has experienced a valuable introduction to whitewater rafting.</p>

    <p>
        For more information and the award application, read
        <a href="../aquatics-guide.pdf">Aquatics Supervision - Leader's Guide</a
        >. The award application is contained in the appendix.
    </p>

    <div class="gallery">
        <img src="/other-awards/whitewater-rafting-bsa-card-front.jpg" />
        <img src="/other-awards/whitewater-rafting-bsa-card-back.jpg" />
    </div>

    <h2>Whitewater Rafting BSA Requirements</h2>

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
