<page>
title: Railroading Merit Badge
badge: railroading
resources:
    - name: Railroading Class Preparation Page
      shortName: Class Preparation Page
      url: /merit-badges/railroading/railroading-cpp.pdf
    - name: Railroading Workbook
      shortName: Workbook
      url: /merit-badges/railroading/railroading-workbook.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '../../../../data/merit-badges/railroading/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
