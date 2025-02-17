<page>
title: 50 Miler
</page>

<script setup lang="ts">
import requirements from '../../../../data/other-awards/50-miler.yaml';
</script>

<template>
    <OtherAwardBucky award="50-miler" />

    <h3>50-Miler</h3>

    <p>The primary objective of this program is to stimulate Scouts BSA, Sea Scout, and Venturer interest in the ideals of the movement and to promote activity that will result in personal fitness, self-reliance, know-ledge of wood lore, water trek, and/or outdoor experience.</p>

    <p>Chartered unit participation is most desirable; however, provisional Scouting units are eligible. This award does not apply if any other BSA award is available for a trip.</p>

    <p><i>The 50-Miler award is available as a decal or in either a cloth or leather patch. It is NOT worn on the uniform or sash, but may be attached to equipment, jackets, backpacks, patch vests, or blankets.</i></p>

    <p><a href="/other-awards/50-miler.pdf">50-Miler Program and Award Application</a></p>

    <h2>50-Miler Award Requirements</h2>

    <p>The Scouts BSA, Sea Scout, or Venturing unit or provisional group must follow these rules for a 50-Miler trip:</p>

    <ul>
        <li>Select a suitable trail or waterway.</li>
        <li>Two-deep leadership must be in effect at all times. Adult leadership should utilize and follow the Guide to Safe Scouting.</li>
        <li>Groups shall complete the 50 miles / 5 day trip by sailboat, canoe, on foot, by horse, or by bicycle.</li>
    </ul>

    <p>The 50-Miler Award is presented to each qualifying individual for satisfactory participation in an approved trip. In order to qualify for the award, the group of which the individual is a member must fulfill all of the following requirements:</p>

    <Requirements :requirements="requirements" />
</template>
