<page>
title: Electricity Merit Badge
badge: electricity
resources:
    - name: Electricity Class Preparation Page
      shortName: Class Preparation Page
      url: /merit-badges/electricity/electricity-cpp.pdf
    - name: Electricity Workbook
      shortName: Workbook
      url: /merit-badges/electricity/electricity-workbook.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '~/data/merit-badges/electricity/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
