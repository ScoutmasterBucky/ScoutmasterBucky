<page>
title: Aviation Merit Badge
badge: aviation
resources:
    - name: Aviation Class Preparation Page
      shortName: Class Preparation Page
      url: /merit-badges/aviation/aviation-cpp.pdf
    - name: Aviation Workbook
      shortName: Workbook
      url: /merit-badges/aviation/aviation-workbook.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '~/data/merit-badges/aviation/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
