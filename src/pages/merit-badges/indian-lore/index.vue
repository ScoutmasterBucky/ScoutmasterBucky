<page>
title: Indian Lore Merit Badge
badge: indian-lore
resources:
    - name: Indian Lore Class Preparation Page
      shortName: Class Preparation Page
      url: /merit-badges/indian-lore/indian-lore-cpp.pdf
    - name: Indian Lore Workbook
      shortName: Workbook
      url: /merit-badges/indian-lore/indian-lore-workbook.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '~/data/merit-badges/indian-lore/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
