<page>
title: Alternate Requirements
</page>

<script setup type="ts">
import requirements from '../../../../data/scout-ranks/alternative-requirements.yaml';
</script>

<template>
    <ScoutRankBucky rank="alternative-requirements" />

    <h3>
        Scout, Tenderfoot, Second Class, and First Class Rank Alternative
        Requirements
    </h3>

    <p>
        A Scout who has a permanent physical or mental disability (or a
        disability expected to last more than two years or beyond the 18th
        birthday) and is unable to complete all of the requirements for Scout,
        Tenderfoot, Second Class, or First Class rank may, with his parents or
        guardian, submit a request to the council advancement committee to
        complete alternative requirements. Below are the procedures for applying
        for alternative requirements. To help facilitate this process, use the
        <a href="https://filestore.scouting.org/filestore/pdf/512-936_wb.pdf"
            >Individual Scout Advancement Plan</a
        >, No. 512-936, which can be found at
        <a href="https://www.scouting.org/advancement"
            >scouting.org/advancement</a
        >. For more detailed information about alternative requirements, see the
        <a href="https://www.scouting.org/resources/guide-to-advancement/"
            >Guide to Advancement</a
        >.
    </p>

    <Requirements :requirements="requirements" />
</template>
