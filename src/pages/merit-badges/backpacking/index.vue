<page>
title: Backpacking Merit Badge
badge: backpacking
resources:
    - name: Backpacking Merit Badge Pamphlet
      url: /merit-badges/backpacking/backpacking-pamphlet.pdf
    - name: Backpacking Class Preparation Page
      shortName: Class Preparation Page
      url: /merit-badges/backpacking/backpacking-cpp.pdf
    - name: Backpacking Workbook
      shortName: Workbook
      url: /merit-badges/backpacking/backpacking-workbook.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '~/data/merit-badges/backpacking/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
