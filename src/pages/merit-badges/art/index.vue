<page>
title: Art Merit Badge
badge: art
resources:
    - name: Art Class Preparation Page
      shortName: Class Preparation Page
      url: /merit-badges/art/art-cpp.pdf
    - name: Art Workbook
      shortName: Workbook
      url: /merit-badges/art/art-workbook.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '../../../../data/merit-badges/art/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
