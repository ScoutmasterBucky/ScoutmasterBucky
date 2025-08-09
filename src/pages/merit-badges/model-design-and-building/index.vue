<page>
title: Model Design and Building Merit Badge
badge: model-design-and-building
resources:
    - name: Model Design and Building Merit Badge Pamphlet
      url: /merit-badges/model-design-and-building/model-design-and-building-pamphlet.pdf
    - name: Model Design and Building Class Preparation Page
      shortName: Class Preparation Page
      url: /merit-badges/model-design-and-building/model-design-and-building-cpp.pdf
    - name: Model Design and Building Workbook
      shortName: Workbook
      url: /merit-badges/model-design-and-building/model-design-and-building-workbook.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '~/data/merit-badges/model-design-and-building/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
