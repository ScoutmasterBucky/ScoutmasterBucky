<page>
title: Architecture Merit Badge
badge: architecture
resources:
    - name: Architecture Merit Badge Pamphlet
      url: /merit-badges/architecture/architecture-pamphlet.pdf
    - name: Architecture Class Preparation Page
      shortName: Class Preparation Page
      url: /merit-badges/architecture/architecture-cpp.pdf
    - name: Architecture Workbook
      shortName: Workbook
      url: /merit-badges/architecture/architecture-workbook.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '~/data/merit-badges/architecture/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
