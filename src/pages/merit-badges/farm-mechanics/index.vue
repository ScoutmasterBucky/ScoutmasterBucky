<page>
title: Farm Mechanics Merit Badge
badge: farm-mechanics
resources:
    - name: Farm Mechanics Class Preparation Page
      shortName: Class Preparation Page
      url: /merit-badges/farm-mechanics/farm-mechanics-cpp.pdf
    - name: Farm Mechanics Workbook
      shortName: Workbook
      url: /merit-badges/farm-mechanics/farm-mechanics-workbook.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '~/data/merit-badges/farm-mechanics/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
