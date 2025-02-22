<page>
supernova: dr-albert-einstein
layout: nova
</page>

<script setup lang="ts">
import requirements from '~/data/nova-lab/supernova/dr-albert-einstein.yaml';
</script>

<template>
    <SupernovaPageStart supernova="dr-albert-einstein" />

    <p>
        <b>Dr. Albert Einstein Supernova Award</b><br />
        <i>For Scouts BSA, Venturers, and Sea Scouts.</i>
    </p>

    <p>
        This award is the highest level of STEM award offered by Scouting
        America, and it is a difficult one to obtain. Make sure to ensure the
        awards ceremony is a special event. See more about award recognition on
        the <a href="../">Supernova Awards</a> page.
    </p>

    <p><b>A Note to the Mentor</b></p>

    <p>
        The Supernova awards recognize superior achievement in the fields of
        science, technology, engineering, and mathematics (STEM). All
        experiments or projects should be conducted using the highest level of
        safety protocol and always under the supervision of a qualified,
        responsible adult.
    </p>

    <h3>Resources</h3>

    <ul>
        <li>
            <a href="../dr-albert-einstein-supernova-application.pdf"
                >Einstein Supernova Application</a
            >
        </li>
        <li>
            <a href="../dr-albert-einstein-supernova-guide.pdf"
                >Einstein Supernova Guide</a
            >
        </li>
        <li>
            <a href="../dr-albert-einstein-supernova-flowchart.pdf"
                >Einstein Supernova Flowchart</a
            >
        </li>
    </ul>

    <h2>Requirements</h2>

    <p>
        A youth must be a registered Scouts BSA member (age 14 or older and
        First Class Rank or higher), Venturer, or Sea Scout when this work is
        completed to earn this award. It is the third award, and must be awarded
        after the <a href="../thomas-alva-edison/">Thomas Alva Edison</a> or
        <a href="../wright-brothers/">Wright Brothers</a> Supernova awards.
    </p>

    <Requirements :requirements="requirements" />
</template>
