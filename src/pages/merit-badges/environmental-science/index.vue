<page>
title: Environmental Science Merit Badge
badge: environmental-science
resources:
    - name: Environmental Science Class Preparation Page
      shortName: Class Preparation Page
      url: /merit-badges/environmental-science/environmental-science-cpp.pdf
    - name: Environmental Science Workbook
      shortName: Workbook
      url: /merit-badges/environmental-science/environmental-science-workbook.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '~/data/merit-badges/environmental-science/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
