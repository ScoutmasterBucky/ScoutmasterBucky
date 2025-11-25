<page>
title: Bugling Merit Badge
badge: bugling
resources:
    - name: Bugling Merit Badge Pamphlet
      url: /merit-badges/bugling/bugling-pamphlet.pdf
    - name: Bugling Class Preparation Page
      shortName: Class Preparation Page
      url: /merit-badges/bugling/bugling-cpp.pdf
    - name: Bugling Workbook
      shortName: Workbook
      url: /merit-badges/bugling/bugling-workbook.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
calls:
    - audio: first-call.mp3
      score: first-call.png
    - audio: reveille.mp3
      score: reveille.png
    - audio: assembly.mp3
      score: assembly.png
    - audio: mess.mp3
      score: mess.png
    - audio: drill-call.mp3
      score: drill-call.png
    - audio: fatigue.mp3
      score: fatigue.png
    - audio: officers-call.mp3
      score: officers-call.png
    - audio: recall.mp3
      score: recall.png
    - audio: church-call.mp3
      score: church-call.png
    - audio: swimming-call.mp3
      score: swimming-call.png
    - audio: fire-call.mp3
      score: fire-call.png
    - audio: retreat-evening-colors.mp3
      score: retreat-evening-colors.png
    - audio: to-the-colors.mp3
      score: to-the-colors.png
    - audio: call-to-quarters.mp3
      score: call-to-quarters.png
    - audio: taps.mp3
      score: taps.png
</page>

<script setup lang="ts">
import requirements from '~/data/merit-badges/bugling/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    >
        <template #additionalResources>
            <h3>Bugle Calls</h3>

            <div class="wrapper">
                <div v-for="call in $frontmatter.calls" class="item">
                    <a :href="call.score" alt="Score" target="_blank">
                    <img :src="call.score" alt="Score" class="wide"/>
                    </a>
                    <audio :src="call.audio" controls></audio>
                </div>
            </div>
        </template>
    </MeritBadgePage>
</template>

<style scoped>
.wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: space-evenly;
}

.item {
    width: 45%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
}

@media (max-width: 768px) {
    .item {
        width: 90%;
    }
}
</style>
