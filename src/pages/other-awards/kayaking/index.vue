<page>
title: Kayaking
</page>

<script setup lang="ts">
import requirements from '~/data/other-awards/kayaking.yaml';
</script>

<template>
    <ScaledContent align="center">
        <OtherAwardBucky award="kayaking" />
    </ScaledContent>

    <h3>Kayaking</h3>

    <p>
        Any youth or adult who is registered with a troop, crew, or ship and
        completes the requirements is eligible for a patch and recognition card,
        available from the local council service center. The completed award
        application should be handled as directed by the council Training,
        Aquatics, or other committee. Instruction for Kayaking BSA is to be
        conducted under safe conditions on calm water. Two to four hours in one
        or more sessions should suffice for instruction and practice. Paddle
        lengths and life jacket sizes should be adequate to fit all
        participants. Feathered blades are preferred, but blades at the same
        angle are allowed. Information and skills are discussed in
        <a href="../aquatics-guide.pdf"
            >Aquatics Supervision: A Leader's Guide to Youth Swimming and
            Boating Activities, No. 34346</a
        >, and the Kayaking merit badge pamphlet. All counselors must be trained
        in Safety Afloat. Any person with current training as a BSA Aquatics
        Instructor, a BSA Aquatics Supervision: Paddle Craft Safety kayak
        instructor or as a kayak instructor by the American Canoe Association
        may serve as a counselor for this award with the approval of the local
        council. A person with similar experience in kayaking skills, safety,
        and instruction may also serve as a counselor with council approval.
        Kayaking BSA is intended to provide Scouts and their leaders with an
        introductory experience to kayaking on lakes, ponds, slow-moving water,
        or calm ocean areas. Additional preparation is needed before a unit does
        extended kayak touring or takes trips on class I or above white water.
    </p>

    <p>
        <i
            >Swimsuit / swim trunks emblem - The Kayaking BSA patch is NOT worn
            on the uniform or the sash; it is worn on the left side of the
            swimsuit / swim trunks.</i
        >
    </p>

    <p>
        Upon successful completion, participants earn the Kayaking BSA patch
        along with their achievement card. Completion indicates the individual
        has experienced a valuable introduction to kayaking.
    </p>

    <p>
        For more information and the award application, read
        <a href="../aquatics-guide.pdf">Aquatics Supervision - Leader's Guide</a
        >. The award application is contained in the appendix.
    </p>

    <h2>Kayaking Requirements</h2>

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
