<page>
title: Astronomy Merit Badge
badge: astronomy
resources:
    - name: Astronomy Class Preparation Page
      shortName: Class Preparation Page
      url: /merit-badges/astronomy/astronomy-cpp.pdf
    - name: Astronomy Workbook
      shortName: Workbook
      url: /merit-badges/astronomy/astronomy-workbook.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '~/data/merit-badges/astronomy/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
