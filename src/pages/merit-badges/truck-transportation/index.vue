<page>
title: Truck Transportation Merit Badge
badge: truck-transportation
resources:
    - name: Truck Transportation Merit Badge Pamphlet
      url: /merit-badges/truck-transportation/truck-transportation-pamphlet.pdf
    - name: Truck Transportation Class Preparation Page
      shortName: Class Preparation Page
      url: /merit-badges/truck-transportation/truck-transportation-cpp.pdf
    - name: Truck Transportation Workbook
      shortName: Workbook
      url: /merit-badges/truck-transportation/truck-transportation-workbook.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '~/data/merit-badges/truck-transportation/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
