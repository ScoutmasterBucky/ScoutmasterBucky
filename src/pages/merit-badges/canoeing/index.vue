<page>
title: Canoeing Merit Badge
badge: canoeing
resources:
    - name: Canoeing Class Preparation Page
      shortName: Class Preparation Page
      url: /merit-badges/canoeing/canoeing-cpp.pdf
    - name: Canoeing Workbook
      shortName: Workbook
      url: /merit-badges/canoeing/canoeing-workbook.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '~/data/merit-badges/canoeing/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
