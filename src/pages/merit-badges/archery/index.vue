<page>
title: Archery Merit Badge
badge: archery
resources:
    - name: Archery Class Preparation Page
      shortName: Class Preparation Page
      url: /merit-badges/archery/archery-cpp.pdf
    - name: Archery Workbook
      shortName: Workbook
      url: /merit-badges/archery/archery-workbook.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '~/data/merit-badges/archery/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
