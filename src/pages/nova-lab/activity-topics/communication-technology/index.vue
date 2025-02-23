<page>
title: Communication Technology
layout: nova
</page>

<script setup lang="ts">
import requirementsPart1 from '~/data/nova-lab/activity-topics/communication-technology-part-1.yaml';
import requirementsPart2 from '~/data/nova-lab/activity-topics/communication-technology-part-2.yaml';
</script>

<template>
    <ActivityTopicPreamble />

    <h2>Communication Technology</h2>

    <p>
        This activity can be done individually or in a group. It requires the
        participation of 20 to 30 people.
    </p>

    <p>
        <b>The scenario:</b> You are the communication chair for a science fair
        being organized by your unit. Your responsibility is to gather contact
        information from all participants (contestants, judges, staff, and so
        on) and formulate a communication plan that will be effective for
        anticipated communications and necessary-but-unexpected communications
        as well. You will need to be able to communicate some information to
        everyone, other information to subgroups, and additional information to
        another group of individuals.
    </p>

    <h3>Part 1: Communication Plan</h3>

    <p>
        Before you get started, share your plan with your mentor. Then do the
        following:
    </p>

    <Requirements :requirements="requirementsPart1" />

    <h3>Part 2: Analysis and Report</h3>

    <p>
        Gather some statistics relevant to your communication plan and your
        participants. Then do the following:
    </p>

    <Requirements :requirements="requirementsPart2" />

    <h3>Resources</h3>

    <p>Roger Price. Best of Mad Libs. Price Stern Sloan, 2008.</p>

    <p>
        Roger Price and Leonard Stern. More Best of Mad Libs. Price Stern Sloan,
        2009.
    </p>

    <p>
        <!-- Updated link to https -->
        For information about Mad Libs, go to
        <a href="https://madlibs.com/">https://madlibs.com/</a>. Click on
        the "Mad Libs Online Widget" to try it out.
    </p>
</template>
