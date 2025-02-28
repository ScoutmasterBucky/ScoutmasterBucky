<page>
title: Plant Science Merit Badge
badge: plant-science
resources:
    - name: Plant Science Workbook - Agronomy Option
      shortName: Workbook - Agronomy Option
      url: /merit-badges/plant-science/plant-science-workbook-agronomy.pdf
    - name: Plant Science Workbook - Field Botany Option
      shortName: Workbook - Field Botany Option
      url: /merit-badges/plant-science/plant-science-workbook-field-botany.pdf
    - name: Plant Science Workbook - Horticulture Option
      shortName: Workbook - Horticulture Option
      url: /merit-badges/plant-science/plant-science-workbook-horticulture.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '~/data/merit-badges/plant-science/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
