<page>
title: Graphic Arts Merit Badge
badge: graphic-arts
resources:
    - name: Graphic Arts Class Preparation Page
      shortName: Class Preparation Page
      url: /merit-badges/graphic-arts/graphic-arts-cpp.pdf
    - name: Graphic Arts Workbook
      shortName: Workbook
      url: /merit-badges/graphic-arts/graphic-arts-workbook.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '../../../../data/merit-badges/graphic-arts/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
