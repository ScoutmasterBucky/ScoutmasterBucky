<page>
title: Eagle Palms
</page>

<script setup lang="ts">
import requirements from '../../../../data/scout-ranks/eagle-palms.yaml';
</script>

<template>
    <ScoutRankBucky rank="eagle-palms" />

    <h3>Eagle Scout Palms</h3>

    <p>Palms are <b>NOT</b> considered ranks but rather an award</p>

    <p>
        A Venturer or Sea Scout attaining the rank of Eagle may earn Eagle
        Palms. For Venturers working on Scouts BSA requirements, replace
        "Scoutmaster" with "crew Advisor." For Sea Scouts working on Scouts BSA
        requirements, replace "Scoutmaster" with "Skipper."
    </p>

    <p>
        After successfully completing your Eagle Scout board of review and being
        validated as an Eagle Scout by the National Service Center, you will be
        entitled to receive an Eagle Palm for each additional five merit badges
        you completed before your Eagle board of review beyond those required
        for Eagle.
    </p>

    <p>
        <b
            >You may wear only the proper combination of Palms for the number of
            merit badges you earned beyond the rank of Eagle. The Bronze Palm
            represents five merit badges, the Gold Palm 10, and the Silver Palm
            15.</b
        >
    </p>

    <p>
        After becoming an Eagle Scout and receiving the Eagle Palms you are
        entitled to, you may earn additional Palms by completing the following
        requirements:
    </p>

    <h2>Eagle Scout Palms Requirements</h2>

    <p>
        After becoming an Eagle Scout and receiving the Eagle Palms you are
        entitled to, you may earn additional Palms by completing the following
        requirements:
    </p>

    <Requirements :requirements="requirements" />
</template>
