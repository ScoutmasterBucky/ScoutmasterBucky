<page>
title: Eagle-Alternative-Requirements
</page>

<script setup lang="ts">
import requirements from '~/data/scout-ranks/eagle-alternative-requirements.yaml';
</script>

<template>
    <ScaledContent align="center">
        <ScoutRankBucky rank="eagle-alternative-requirements" />
    </ScaledContent>

    <h3>Alternative Requirements for Eagle Scout Rank</h3>

    <p>
        The Eagle Scout rank may be achieved by a Scouts BSA Scout or a
        qualified<sup>*</sup> Venturer or Sea Scout who has a physical or mental
        disability by completing the
        <a href="https://filestore.scouting.org/filestore/pdf/512-730.pdf"
            >Application for Alternative Eagle Scout Rank Merit Badges, No.
            512-730</a
        >, and by qualifying for alternative merit badges. This does not apply
        to individual requirements for merit badges. Merit badges are awarded
        only when all requirements are met as stated. See the
        <a href="https://www.scouting.org/resources/guide-to-advancement/"
            >Guide to Advancement</a
        >, section 10.2.2.3, for details.
    </p>

    <p>
        The physical or mental disability must be of a permanent rather than of
        a temporary nature or a disability expected to last more than two years
        or beyond age 18. The application must include a written statement from
        a qualified health professional related to the nature of the disability.
        This person may be a physician, neurologist, psychiatrist, psychologist,
        etc., or, when appropriate, an educational administrator in special
        education.
    </p>

    <p>
        Before applying, a Scout must earn as many of the Eagle-required merit
        badges as possible. However, where a permanent disability clearly
        precludes completing specific merit badges, a Scout who has earned at
        least First Class may apply for an alternative merit badge without
        waiting until all other Eagle-required merit badges are complete. Any
        alternatives must present the same challenge and learning level as those
        they replace, and must be completed prior to the 18th birthday unless
        the member is registered beyond the age of eligibility (reference
        <a href="https://www.scouting.org/resources/guide-to-advancement/"
            >Guide to Advancement</a
        >, sections 10.1.0.1 - 10.1.0.2.
    </p>

    <p>
        <sup>*</sup> In order to be an Eagle Scout candidate, a Venturer or Sea
        Scout must have achieved First Class rank as a registered Scout or as a
        Lone Scout.
    </p>

    <h2>Eagle Scout Rank Alternative Requirements</h2>

    <Requirements :requirements="requirements" />
</template>
