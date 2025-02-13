<page>
title: Public Health Merit Badge
badge: public-health
resources:
    - name: Public Health Class Preparation Page
      shortName: Class Preparation Page
      url: /merit-badges/public-health/public-health-cpp.pdf
    - name: Public Health Workbook
      shortName: Workbook
      url: /merit-badges/public-health/public-health-workbook.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '../../../../data/merit-badges/public-health/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
