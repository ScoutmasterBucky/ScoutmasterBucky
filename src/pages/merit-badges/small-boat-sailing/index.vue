<page>
title: Small-Boat Sailing Merit Badge
badge: small-boat-sailing
resources:
    - name: Small-Boat Sailing Class Preparation Page
      shortName: Class Preparation Page
      url: /merit-badges/small-boat-sailing/small-boat-sailing-cpp.pdf
    - name: Small-Boat Sailing Workbook
      shortName: Workbook
      url: /merit-badges/small-boat-sailing/small-boat-sailing-workbook.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '../../../../data/merit-badges/small-boat-sailing/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
