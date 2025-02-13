<page>
title: Family Life Merit Badge
badge: family-life
resources:
    - name: Family Life Class Preparation Page
      shortName: Class Preparation Page
      url: /merit-badges/family-life/family-life-cpp.pdf
    - name: Family Life Workbook
      shortName: Workbook
      url: /merit-badges/family-life/family-life-workbook.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '../../../../data/merit-badges/family-life/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
