<page>
title: "Linking the Past to the Future: Predicting Old Faithful's Next Eruption"
layout: nova
</page>

<script setup lang="ts">
import requirementsPart1 from '~/data/nova-lab/activity-topics/old-faithful-part-1.yaml';
import requirementsPart2 from '~/data/nova-lab/activity-topics/old-faithful-part-2.yaml';
</script>

<template>
    <ActivityTopicPreamble />

    <h2>
        Linking the Past to the Future: Predicting Old Faithful's Next Eruption
    </h2>

    <p>
        This activity can be done individually, but works much better with three
        to six people.
    </p>

    <p>
        <b>The scenario:</b> You have lined up a summer job as a junior park
        ranger at Yellowstone National Park, where you know many visitors come
        to see the geyser Old Faithful. Many visitors arrive just after Old
        Faithful has erupted and they typically ask a nearby ranger when it is
        next expected to erupt. Your task is to analyze past ~/data on Old
        Faithful's eruptions in order to devise a strategy for predicting the
        next eruption.
    </p>

    <h3>Part 1: ~/data Gathering and Initial Analysis</h3>

    <Requirements :requirements="requirementsPart1" />

    <h3>
        Part 2: Further Analysis, Refinement of Prediction Strategy, and Report
    </h3>

    <Requirements :requirements="requirementsPart2" />

    <h3>Resources</h3>

    <p>
        T. Scott Bryan. Geysers: What They Are and How They Work, 2nd ed.
        Mountain Press Publishing Company, 2005.
    </p>

    <p>
        William J. Fritz. Roadside Geology of the Yellowstone Country. Mountain
        Press Publishing Company, 1985.
    </p>
</template>
