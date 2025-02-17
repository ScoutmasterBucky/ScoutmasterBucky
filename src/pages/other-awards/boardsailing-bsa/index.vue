<page>
title: Boardsailing BSA
</page>

<script setup lang="ts">
import requirements from '../../../../data/other-awards/boardsailing-bsa.yaml';
</script>

<template>
    <OtherAwardBucky award="boardsailing-bsa" />

    <h3>Boardsailing BSA</h3>

    <p>
        Boardsailing BSA has been developed to introduce basic boardsailing
        skills, equipment, and safety precautions; to encourage the development
        of skills that promote fitness and safe aquatic recreation; and to lay a
        foundation for more advanced and demanding boardsailing activities. Any
        youth or adult who is registered with a troop, crew, or ship and
        completes the requirements is eligible for a patch and recognition card.
        The completed award application should be handled as directed by the
        council Training, Aquatics, or other committee.
    </p>

    <p>
        All counselors must be trained in Safety Afloat and have council
        approval. Any person recognized as a boardsailing instructor by US
        Windsurfing or US Sailing, or someone with similar experience in
        boardsailing skills, safety, and instruction, may serve as a counselor
        for this award.
    </p>

    <p>
        Instruction must be conducted on a protected body of water in an area
        free from other traffic or large waves. Initial water entry and practice
        should be on a gradual beach clear of hazards. A steady three-to-seven
        knot breeze is ideal for beginner practice. All participants should be
        close enough to supervisory personnel for efficient instruction and
        ready assistance.
    </p>

    <p>
        All requirements must be completed as stated. Basic skills and safety
        precautions are presented in the BSA publication:
        <a href="/other-awards/aquatics-guide.pdf"
            >Aquatics Supervision: A Youth Leader’s Guide for Swimming and
            Boating Activities, No. 34346</a
        >. Additional resources may be found online at
        <a href="https://www.uswindsurfing.org">www.uswindsurfing.org</a> and
        <a href="https://www.ussailing.org">www.ussailing.org</a>.
    </p>

    <p>
        <i
            >Swimsuit / swim trunks emblem - The Boardsailing BSA patch is NOT
            worn on the uniform or the sash; it is worn on the left side of the
            swimsuit / swim trunks.</i
        >
    </p>

    <p>
        Upon successful completion, participants earn the Boardsailing BSA patch
        along with their achievement card. Completion indicates the individual
        has experienced a valuable introduction to boardsailing.
    </p>

    <p>
        For more information and the award application, read
        <a href="../aquatics-guide.pdf">Aquatics Supervision - Leader's Guide</a
        >. The award application is contained in the appendix.
    </p>

    <div class="gallery">
        <img src="/other-awards/boardsailing-bsa-card-front.jpg" />
    </div>

    <h2>Boardsailing BSA Requirements</h2>

    <Requirements :requirements="requirements" />
</template>

<style scoped>
.gallery {
    display: flex;
    justify-content: center;
}

.gallery img {
    max-width: 100%;
}
</style>
