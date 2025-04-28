<page>
title: Complete Angler
</page>

<script setup lang="ts">
import requirements from '~/data/other-awards/complete-angler.yaml';
</script>

<template>
    <ScaledContent align="center">
        <OtherAwardBucky award="complete-angler" />
    </ScaledContent>

    <h3>Complete Angler</h3>

    <p>The Scouting America Complete Angler Award honors Scouts who earn all three fishing-related merit badges: Fishing, Fly-Fishing, and Fish &amp; Wildlife Management.</p>

    <p>Fishing Merit Badge was one of the original merit badges and over two million have earned it. In a recent Boys’ Life survey, fishing placed 4th overall as the preferred outdoor activity, surpassed only by camping, swimming and bicycling. What better way to keep older Scouts involved than by expanding on this trend.</p>

    <p>After completing the Complete Angler Recognition, these older Scouts can become mentors for younger Scouts, sharing their knowledge and helping others to enjoy a positive fishing experience.</p>

    <p><i>The Complete Angler patch is available as a patch which may be worn as a temproary patch on the right pocket of any Scouting uniform.</i></p>

    <p><a href="/other-awards/complete-angler.pdf">Complete Angler Award Application</a></p>

    <h2>Complete Angler Requirements</h2>

      <Requirements :requirements="requirements" />
</template>
