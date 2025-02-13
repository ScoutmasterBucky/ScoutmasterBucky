<page>
title: Textile Merit Badge
badge: textile
resources:
    - name: Textile Class Perparation Page
      shortName: Class Preparation Page
      url: /merit-badges/textile/textile-cpp.pdf
    - name: Textile Workbook
      shortName: Workbook
      url: /merit-badges/textile/textile-workbook.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '../../../../data/merit-badges/textile/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
