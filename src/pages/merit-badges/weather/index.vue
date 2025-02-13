<page>
title: Weather Merit Badge
badge: weather
resources:
    - name: Weather Class Perparation Page
      shortName: Class Preparation Page
      url: /merit-badges/weather/weather-cpp.pdf
    - name: Weather Workbook
      shortName: Workbook
      url: /merit-badges/weather/weather-workbook.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '../../../../data/merit-badges/weather/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
