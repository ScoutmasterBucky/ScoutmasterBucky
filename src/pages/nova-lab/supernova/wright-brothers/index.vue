<page>
supernova: wright-brothers
layout: nova
</page>

<script setup lang="ts">
import requirements from '~/data/nova-lab/supernova/wright-brothers.yaml';
</script>

<template>
    <SupernovaPageStart supernova="wright-brothers" />

    <p>
        <b>Wright Brothers Supernova Award</b><br /><i
            >For Venturers and Sea Scouts</i
        >
    </p>

    <p>
        You must be a Venturer or Sea Scout to earn a Venturing or Sea Scout
        Supernova award. With your parent’s and unit leader’s help, you must
        select a council-approved mentor who is a registered Scouter. You may
        NOT choose your parent or your unit leader (unless the mentor is working
        with more than one youth).
    </p>

    <p><b>A Note to the Mentor</b></p>

    <p>
        The Venturing and Sea Scout Supernova awards recognize superior
        achievement by a Venturer or Sea Scout in the fields of science,
        technology, engineering, and mathematics (STEM). All experiments or
        projects should be conducted using the highest level of safety protocol
        and always under the supervision of a qualified, responsible adult.
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
        A youth must be a registered Venturer or Sea Scout and have earned
        either the <a href="../dr-sally-ride/">Dr. Sally Ride</a> or
        <a href="../dr-bernard-harris/">Dr. Bernard Harris</a> Supernova Awards
        to earn this award.
    </p>

    <Requirements :requirements="requirements" />
</template>
