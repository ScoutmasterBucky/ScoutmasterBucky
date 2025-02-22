<page>
title: Cooking Merit Badge
badge: cooking
resources:
    - name: Cooking Class Preparation Page
      shortName: Class Preparation Page
      url: /merit-badges/cooking/cooking-cpp.pdf
    - name: Cooking Workbook
      shortName: Workbook
      url: /merit-badges/cooking/cooking-workbook.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '~/data/merit-badges/cooking/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
