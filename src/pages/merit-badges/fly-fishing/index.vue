<page>
title: Fly Fishing Merit Badge
badge: fly-fishing
resources:
    - name: Fly Fishing Class Preparation Page
      shortName: Class Preparation Page
      url: /merit-badges/fly-fishing/fly-fishing-cpp.pdf
    - name: Fly Fishing Workbook
      shortName: Workbook
      url: /merit-badges/fly-fishing/fly-fishing-workbook.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '../../../../data/merit-badges/fly-fishing/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
