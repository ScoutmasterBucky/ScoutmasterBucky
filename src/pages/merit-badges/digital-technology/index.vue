<page>
title: Digital Technology Merit Badge
badge: digital-technology
resources:
    - name: Digital Technology Class Preparation Page
      shortName: Class Preparation Page
      url: /merit-badges/digital-technology/digital-technology-cpp.pdf
    - name: Digital Technology Workbook
      shortName: Workbook
      url: /merit-badges/digital-technology/digital-technology-workbook.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '~/data/merit-badges/digital-technology/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
