<page>
title: Programming Merit Badge
badge: programming
resources:
    - name: Programming Class Preparation Page
      shortName: Class Preparation Page
      url: /merit-badges/programming/programming-cpp.pdf
    - name: Programming Workbook
      shortName: Workbook
      url: /merit-badges/programming/programming-workbook.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '~/data/merit-badges/programming/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
