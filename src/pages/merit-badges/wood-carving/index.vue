<page>
title: Wood Carving Merit Badge
badge: wood-carving
resources:
    - name: Wood Carving Merit Badge Pamphlet
      url: /merit-badges/wood-carving/wood-carving-pamphlet.pdf
    - name: Wood Carving Class Preparation Page
      shortName: Class Preparation Page
      url: /merit-badges/wood-carving/wood-carving-cpp.pdf
    - name: Wood Carving Workbook
      shortName: Workbook
      url: /merit-badges/wood-carving/wood-carving-workbook.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '~/data/merit-badges/wood-carving/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
