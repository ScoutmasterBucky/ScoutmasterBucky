<page>
title: Forestry Merit Badge
badge: forestry
resources:
    - name: Forestry Class Preparation Page
      shortName: Class Preparation Page
      url: /merit-badges/forestry/forestry-cpp.pdf
    - name: Forestry Workbook
      shortName: Workbook
      url: /merit-badges/forestry/forestry-workbook.pdf
    - name: Scoutmaster Bucky Forestry Field Notebook
      shortName: Field Notebook
      url: /merit-badges/forestry/scoutmaster-bucky-forestry-field-notebook.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '~/data/merit-badges/forestry/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
