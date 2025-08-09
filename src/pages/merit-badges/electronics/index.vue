<page>
title: Electronics Merit Badge
badge: electronics
resources:
    - name: Electronics Merit Badge Pamphlet
      url: /merit-badges/electronics/electronics-pamphlet.pdf
    - name: Electronics Class Preparation Page
      shortName: Class Preparation Page
      url: /merit-badges/electronics/electronics-cpp.pdf
    - name: Electronics Workbook
      shortName: Workbook
      url: /merit-badges/electronics/electronics-workbook.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '~/data/merit-badges/electronics/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
