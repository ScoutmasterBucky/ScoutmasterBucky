<page>
title: Bird Study Merit Badge
badge: bird-study
resources:
    - name: Bird Study Class Preparation Page
      shortName: Class Preparation Page
      url: /merit-badges/bird-study/bird-study-cpp.pdf
    - name: Bird Study Workbook
      shortName: Workbook
      url: /merit-badges/bird-study/bird-study-workbook.pdf
    - name: Scoutmaster Bucky Bird Study Field Notebook
      shortName: Field Notebook
      url: /merit-badges/bird-study/scoutmaster-bucky-bird-study-field-notebook.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '~/data/merit-badges/bird-study/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
