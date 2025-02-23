<page>
supernova: thomas-alva-edison
layout: nova
</page>

<script setup lang="ts">
import requirements from '~/data/nova-lab/supernova/thomas-alva-edison.yaml';
</script>

<template>
    <SupernovaPageStart supernova="thomas-alva-edison" />

    <p><b>Thomas Alva Edison Supernova Award</b><br /><i>For Scouts BSA</i></p>

    <p>
        If you thrive on challenge, then earning the Supernova award will be
        right up your alley. To be eligible, you must be a First Class Scout or
        higher. As a prerequisite, you must first earn any three of the four
        Nova awards for Scouts BSA. With your parent's and unit leader's help,
        you must select a council-approved mentor who is a registered Scouter.
        You may NOT choose your parent or your unit leader (unless the mentor is
        working with more than one youth).
    </p>

    <p><b>A Note to the Mentor</b></p>

    <p>
        The Scouts BSA Supernova awards recognize superior achievement by a
        Scout in the fields of science, technology, engineering, and mathematics
        (STEM). All experiments or projects should be conducted using the
        highest level of safety protocol and always under the supervision of a
        qualified, responsible adult. The Scout should always have a buddy when
        meeting with his counselor or mentor.
    </p>

    <h3>Resources</h3>

    <ul>
        <li>
            <a href="/nova-lab/supernova/award-application.pdf"
                >Award Application</a
            >
        </li>
    </ul>

    <h2>Requirements</h2>

    <p>
        A youth must be a registered Scouts BSA member, age 14 or older, and at
        least First Class rank to earn this award. This award can be earned only
        after first obtaining the
        <a href="../dr-bernard-harris/">Dr. Bernard Harris Supernova Award</a>.
    </p>

    <Requirements :requirements="requirements" />
</template>
