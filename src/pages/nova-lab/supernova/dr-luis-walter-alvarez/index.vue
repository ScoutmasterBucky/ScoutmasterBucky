<page>
supernova: dr-luis-walter-alvarez
layout: nova
# Changed "counselor" to "mentor" to match terms with current BSA training
</page>

<script setup lang="ts">
import requirements from '~/data/nova-lab/supernova/dr-luis-walter-alvarez.yaml';
</script>

<template>
    <SupernovaPageStart supernova="dr-luis-walter-alvarez" />

    <p>
        <b>Dr. Luis W. Alvarez Supernova Award</b><br /><i
            >For Cub Scouts – Bear and Wolf</i
        >
    </p>

    <p>
        This Supernova award can be earned by Cub Scouts like you who want to
        soar in science. To earn the award, you must be a Wolf or Bear Cub Scout
        who is active with a den. With your parent’s and unit leader’s help, you
        must select a council-approved mentor who is a registered Scouter. You
        may NOT choose your parent or your unit leader (unless the mentor is
        working with more than one youth).
    </p>

    <p><b>A Note to the Mentor</b></p>

    <p>
        The Cub Scout Supernova award recognizes superior achievement by a Cub
        Scout in the fields of science, technology, engineering, and mathematics
        (STEM).
    </p>

    <p>
        All experiments or projects should be conducted using the highest level
        of safety protocol and always under the supervision of a qualified,
        responsible adult.
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
        A youth must be a Bear or Wolf and a currently registered Cub Scout to
        earn this award.
    </p>

    <Requirements :requirements="requirements" />
</template>
