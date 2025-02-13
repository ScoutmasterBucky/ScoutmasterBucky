<page>
title: Journalism Merit Badge
badge: journalism
resources:
    - name: Journalism Class Preparation Page
      shortName: Class Preparation Page
      url: /merit-badges/journalism/journalism-cpp.pdf
    - name: Journalism Workbook
      shortName: Workbook
      url: /merit-badges/journalism/journalism-workbook.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '../../../../data/merit-badges/journalism/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
