<page>
title: Cycling Merit Badge
badge: cycling
resources:
    - name: Cycling Class Preparation Page
      shortName: Class Preparation Page
      url: /merit-badges/cycling/cycling-cpp.pdf
    - name: Cycling Workbook
      shortName: Workbook
      url: /merit-badges/cycling/cycling-workbook.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '~/data/merit-badges/cycling/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
