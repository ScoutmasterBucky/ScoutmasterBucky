<page>
title: Fire Safety Merit Badge
badge: fire-safety
resources:
    - name: Fire Safety Class Preparation Page
      shortName: Class Preparation Page
      url: /merit-badges/fire-safety/fire-safety-cpp.pdf
    - name: Fire Safety Workbook
      shortName: Workbook
      url: /merit-badges/fire-safety/fire-safety-workbook.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '~/data/merit-badges/fire-safety/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
