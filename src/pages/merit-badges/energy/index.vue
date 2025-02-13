<page>
title: Energy Merit Badge
badge: energy
resources:
    - name: Energy Class Preparation Page
      shortName: Class Preparation Page
      url: /merit-badges/energy/energy-cpp.pdf
    - name: Energy Workbook
      shortName: Workbook
      url: /merit-badges/energy/energy-workbook.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '../../../../data/merit-badges/energy/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
