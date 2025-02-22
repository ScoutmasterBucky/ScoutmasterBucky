<page>
title: American Labor Merit Badge
badge: american-labor
resources:
    - name: American Labor Class Preparation Page
      shortName: Class Preparation Page
      url: /merit-badges/american-labor/american-labor-cpp.pdf
    - name: American Labor Workbook
      shortName: Workbook
      url: /merit-badges/american-labor/american-labor-workbook.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '~/data/merit-badges/american-labor/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
