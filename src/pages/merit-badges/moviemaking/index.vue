<page>
title: Moviemaking Merit Badge
badge: moviemaking
resources:
    - name: Moviemaking Class Preparation Page
      shortName: Class Preparation Page
      url: /merit-badges/moviemaking/moviemaking-cpp.pdf
    - name: Moviemaking Workbook
      shortName: Workbook
      url: /merit-badges/moviemaking/moviemaking-workbook.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '~/data/merit-badges/moviemaking/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
