<page>
title: Stamp Collecting Merit Badge
badge: stamp-collecting
resources:
    - name: Stamp Collecting Class Preparation Page
      shortName: Class Preparation Page
      url: /merit-badges/stamp-collecting/stamp-collecting-cpp.pdf
    - name: Stamp Collecting Workbook
      shortName: Workbook
      url: /merit-badges/stamp-collecting/stamp-collecting-workbook.pdf
    - name: US Historic Postage Stamp Album compliments of Mystic Stamp Company
      shortName: US Historic Postage Stamp Album
      url: /merit-badges/stamp-collecting/mystic-stamp-company-historic-postage-stamps-2024.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '~/data/merit-badges/stamp-collecting/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
