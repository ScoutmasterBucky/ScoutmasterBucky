<page>
title: Safety Merit Badge
badge: safety
resources:
    - name: Safety Class Preparation Page
      shortName: Class Preparation Page
      url: /merit-badges/safety/safety-cpp.pdf
    - name: Safety Workbook
      shortName: Workbook
      url: /merit-badges/safety/safety-workbook.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '~/data/merit-badges/safety/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
