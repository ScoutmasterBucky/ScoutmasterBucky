<page>
title: Engineering Merit Badge
badge: engineering
resources:
    - name: Engineering Merit Badge Pamphlet
      url: /merit-badges/engineering/engineering-pamphlet.pdf
    - name: Engineering Class Preparation Page
      shortName: Class Preparation Page
      url: /merit-badges/engineering/engineering-cpp.pdf
    - name: Engineering Workbook
      shortName: Workbook
      url: /merit-badges/engineering/engineering-workbook.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '~/data/merit-badges/engineering/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
