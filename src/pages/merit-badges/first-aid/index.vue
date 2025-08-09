<page>
title: First Aid Merit Badge
badge: first-aid
resources:
    - name: First Aid Merit Badge Pamphlet
      url: /merit-badges/first-aid/first-aid-pamphlet.pdf
    - name: First Aid Class Preparation Page
      shortName: Class Preparation Page
      url: /merit-badges/first-aid/first-aid-cpp.pdf
    - name: First Aid Workbook
      shortName: Workbook
      url: /merit-badges/first-aid/first-aid-workbook.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '~/data/merit-badges/first-aid/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
