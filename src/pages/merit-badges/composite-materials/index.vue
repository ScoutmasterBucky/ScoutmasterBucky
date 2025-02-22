<page>
title: Composite Materials Merit Badge
badge: composite-materials
resources:
    - name: Composite Materials Class Preparation Page
      shortName: Class Preparation Page
      url: /merit-badges/composite-materials/composite-materials-cpp.pdf
    - name: Composite Materials Workbook
      shortName: Workbook
      url: /merit-badges/composite-materials/composite-materials-workbook.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '~/data/merit-badges/composite-materials/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
