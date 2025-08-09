<page>
title: Music Merit Badge
badge: music
resources:
    - name: Music Merit Badge Pamphlet
      url: /merit-badges/music/music-pamphlet.pdf
    - name: Music Class Preparation Page
      shortName: Class Preparation Page
      url: /merit-badges/music/music-cpp.pdf
    - name: Music Workbook
      shortName: Workbook
      url: /merit-badges/music/music-workbook.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '~/data/merit-badges/music/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
