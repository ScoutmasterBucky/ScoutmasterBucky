<page>
title: American Heritage Merit Badge
badge: american-heritage
resources:
    - name: American Heritage Class Preparation Page
      shortName: Class Preparation Page
      url: /merit-badges/american-heritage/american-heritage-cpp.pdf
    - name: American Heritage Workbook
      shortName: Workbook
      url: /merit-badges/american-heritage/american-heritage-workbook.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '../../../../data/merit-badges/american-heritage/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
