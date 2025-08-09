<page>
title: Basketry Merit Badge
badge: basketry
resources:
    - name: Basketry Merit Badge Pamphlet
      url: /merit-badges/basketry/basketry-pamphlet.pdf
    - name: Basketry Class Preparation Page
      shortName: Class Preparation Page
      url: /merit-badges/basketry/basketry-cpp.pdf
    - name: Basketry Workbook
      shortName: Workbook
      url: /merit-badges/basketry/basketry-workbook.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '~/data/merit-badges/basketry/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
