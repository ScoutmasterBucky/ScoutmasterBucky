<page>
title: Inventing Merit Badge
badge: inventing
resources:
    - name: Inventing Class Preparation Page
      shortName: Class Preparation Page
      url: /merit-badges/inventing/inventing-cpp.pdf
    - name: Inventing Workbook
      shortName: Workbook
      url: /merit-badges/inventing/inventing-workbook.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '../../../../data/merit-badges/inventing/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
