<page>
title: BSA Stand Up Paddleboarding
</page>

<script setup lang="ts">
import requirements from '~/data/other-awards/bsa-stand-up-paddleboarding.yaml';
</script>

<template>
    <ScaledContent align="center">
        <OtherAwardBucky award="bsa-stand-up-paddleboarding" />
    </ScaledContent>

    <h3>BSA Stand Up Paddleboarding</h3>

    <p>
        Any youth or adult who is registered with a troop, crew, or ship and
        completes the requirements is eligible for a patch and recognition card.
        The completed award application should be handled as directed by the
        council Training, Aquatics, or other committee. Instruction for the BSA
        SUP award is to be conducted under safe conditions on calm water. One to
        three hours in one or more sessions should suffice for instruction and
        practice.
    </p>

    <p>
        Information and skills are discussed in
        <a href="../aquatics-guide.pdf"
            >Aquatics Supervision: A Leader’s Guide to Youth Swimming and
            Boating Activities, No. 34346</a
        >, and the BSA SUP brochure at www.scouting.org. All counselors must be
        trained in Safety Afloat and have council approval. Any person with
        current training as a BSA Aquatics Instructor or as a SUP instructor by
        the American Canoe Association, or a person with similar experience in
        SUP skills, safety, and instruction may serve as a counselor.
    </p>

    <p>
        <i
            >Swimsuit / swim trunks emblem - The BSA Stand Up Paddleboarding
            patch is NOT worn on the uniform or the sash; it is worn on the left
            side of the swimsuit / swim trunks.</i
        >
    </p>

    <p>
        Upon successful completion, participants earn the BSA Stand Up
        Paddleboarding patch along with their achievement card. Completion
        indicates the individual has experienced a valuable introduction to
        stand up paddleboarding.
    </p>

    <p>
        For more information and the award application, read
        <a href="../aquatics-guide.pdf">Aquatics Supervision - Leader's Guide</a
        >. The award application is contained in the appendix.
    </p>

    <div class="gallery">
        <img src="/other-awards/bsa-stand-up-paddleboarding-card-front.jpg" />
        <img src="/other-awards/bsa-stand-up-paddleboarding-card-back.jpg" />
    </div>

    <h2>BSA Stand Up Paddleboarding Requirements</h2>

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
