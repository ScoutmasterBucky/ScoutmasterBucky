<page>
title: Geology Merit Badge
badge: geology
resources:
    - name: Geology Merit Badge Pamphlet
      url: /merit-badges/geology/geology-pamphlet.pdf
    - name: Geology Workbook - Earth History Option
      shortName: Workbook - Earth History Option
      url: /merit-badges/geology/geology-workbook-earth-history.pdf
    - name: Geology Workbook - Energy Resources Option
      shortName: Workbook - Energy Resources Option
      url: /merit-badges/geology/geology-workbook-energy-resources.pdf
    - name: Geology Workbook - Mineral Resources Option
      shortName: Workbook - Mineral Resources Option
      url: /merit-badges/geology/geology-workbook-mineral-resources.pdf
    - name: Geology Workbook - Surface and Sedimentary Process Option
      shortName: Workbook - Surface and Sedimentary Process Option
      url: /merit-badges/geology/geology-workbook-surface-and-sedimentary-process.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '~/data/merit-badges/geology/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
