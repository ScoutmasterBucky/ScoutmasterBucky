<page>
title: Snorkeling BSA
</page>

<script setup lang="ts">
import requirements from '~/data/other-awards/snorkeling-bsa.yaml';
</script>

<template>
    <ScaledContent align="center">
        <OtherAwardBucky award="snorkeling-bsa" />
    </ScaledContent>

    <h3>Snorkeling BSA</h3>

    <p>
        The Snorkeling BSA requirements introduce the special skills, equipment,
        and safety precautions associated with snorkeling; encourage the
        development of aquatics skills that promote fitness and recreation; and
        provide a foundation for those who later will participate in more
        advanced underwater activity.
    </p>

    <p>
        Any youth or adult who is registered with a troop, crew, or ship and
        completes the requirements is eligible for a patch and recognition card.
        The completed award application should be handled as directed by the
        council Training, Aquatics, or other committee.
    </p>

    <p>
        All counselors must have current Safe Swim Defense training and council
        approval. Anyone currently trained as a BSA Aquatics Instructor or
        certified as a snorkeling instructor by a BSA recognized scuba training
        agency may serve as a counselor for the Snorkeling BSA award. Councils
        may also approve counselors who have been trained and are supervised by
        those with the previously listed credentials.
    </p>

    <p>
        Instruction must be conducted in clear, confined water with a maximum
        depth of 12 feet. A swimming pool is recommended. Snorkeling BSA is
        ideally suited to winter programs using indoor pools. Three 45-minute
        sessions are recommended for instruction, practice, and completion of
        requirements.
    </p>

    <p>
        All aspects of Safe Swim Defense apply during instruction, practice, and
        all other snorkeling activities. Snorkeling in open water requires each
        participant to first demonstrate knowledge and skills equivalent to the
        Snorkeling BSA requirements.
    </p>

    <p>
        <a href="../aquatics-guide.pdf"
            >Aquatics Supervision: A Leader’s Guide to Youth Swimming and
            Boating Activities, No. 34346</a
        >, provides reference material for Snorkeling BSA instruction. Scuba
        training agencies, equipment manufacturers, and others occasionally
        publish references available online and through bookstores and dive
        shops. Although few dedicated snorkeling texts are available,
        instruction manuals for scuba diving contain pertinent information.
    </p>

    <p>
        All requirements must be completed as stated on the application form.
        The counselor may not omit, vary, or add requirements. The skill
        requirements are listed in an order appropriate for instruction.
    </p>

    <p>
        The second requirement considers the time-honored and time-proven
        principle of the buddy system. Snorkelers must use the buddy system at
        all times. Before beginning the activity, each person helps their buddy
        fit and check equipment. The principle of the buddy system is that two
        people can enjoy an aquatics activity together while each provides a
        critical margin of safety for the other. Each buddy must constantly be
        aware of the condition and circumstances of their buddy, and must always
        be prepared to call for aid or give immediate assistance if needed.
    </p>

    <p>
        <i
            >Swimsuit / swim trunks emblem - The Snorkeling BSA patch is NOT
            worn on the uniform or the sash; it is worn on the left side of the
            swimsuit / swim trunks.</i
        >
    </p>

    <p>
        Upon successful completion, participants earn the Snorkeling BSA patch
        along with their achievement card. Completion indicates the individual
        has experienced a valuable introduction to snorkeling.
    </p>

    <p>
        For more information and the award application, read
        <a href="../aquatics-guide.pdf">Aquatics Supervision - Leader's Guide</a
        >. The award application is contained in the appendix.
    </p>

    <div class="gallery">
        <img src="/other-awards/snorkeling-bsa-card-front.jpg" />
        <img src="/other-awards/snorkeling-bsa-card-back.jpg" />
    </div>

    <h2>Snorkeling BSA Requirements</h2>

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
