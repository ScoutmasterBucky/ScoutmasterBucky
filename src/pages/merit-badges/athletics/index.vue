<page>
title: Athletics Merit Badge
badge: athletics
resources:
    - name: Athletics Class Preparation Page
      shortName: Class Preparation Page
      url: /merit-badges/athletics/athletics-cpp.pdf
    - name: Athletics Workbook
      shortName: Workbook
      url: /merit-badges/athletics/athletics-workbook.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '../../../../data/merit-badges/athletics/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
