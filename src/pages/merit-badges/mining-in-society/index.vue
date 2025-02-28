<page>
title: Mining in Society Merit Badge
badge: mining-in-society
resources:
    - name: Mining in Society Class Preparation Page
      shortName: Class Preparation Page
      url: /merit-badges/mining-in-society/mining-in-society-cpp.pdf
    - name: Mining in Society Workbook
      shortName: Workbook
      url: /merit-badges/mining-in-society/mining-in-society-workbook.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '~/data/merit-badges/mining-in-society/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
