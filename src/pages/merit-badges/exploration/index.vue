<page>
title: Exploration Merit Badge
badge: exploration
resources:
    - name: Exploration Class Preparation Page
      shortName: Class Preparation Page
      url: /merit-badges/exploration/exploration-cpp.pdf
    - name: Exploration Workbook
      shortName: Workbook
      url: /merit-badges/exploration/exploration-workbook.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '~/data/merit-badges/exploration/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
