<page>
title: Nuclear Science Merit Badge
badge: nuclear-science
resources:
    - name: Nuclear Science Class Preparation Page
      shortName: Class Preparation Page
      url: /merit-badges/nuclear-science/nuclear-science-cpp.pdf
    - name: Nuclear Science Workbook
      shortName: Workbook
      url: /merit-badges/nuclear-science/nuclear-science-workbook.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '~/data/merit-badges/nuclear-science/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
