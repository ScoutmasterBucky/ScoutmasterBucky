<page>
title: Dentistry Merit Badge
badge: dentistry
resources:
    - name: Dentistry Class Preparation Page
      shortName: Class Preparation Page
      url: /merit-badges/dentistry/dentistry-cpp.pdf
    - name: Dentistry Workbook
      shortName: Workbook
      url: /merit-badges/dentistry/dentistry-workbook.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '../../../../data/merit-badges/dentistry/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
