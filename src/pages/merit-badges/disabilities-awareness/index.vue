<page>
title: Disabilities Awareness Merit Badge
badge: disabilities-awareness
resources:
    - name: Disabilities Awareness Class Preparation Page
      shortName: Class Preparation Page
      url: /merit-badges/disabilities-awareness/disabilities-awareness-cpp.pdf
    - name: Disabilities Awareness Workbook
      shortName: Workbook
      url: /merit-badges/disabilities-awareness/disabilities-awareness-workbook.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '../../../../data/merit-badges/disabilities-awareness/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
