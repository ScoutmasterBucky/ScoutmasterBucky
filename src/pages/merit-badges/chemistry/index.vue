<page>
title: Chemistry Merit Badge
badge: chemistry
resources:
    - name: Chemistry Class Preparation Page
      shortName: Class Preparation Page
      url: /merit-badges/chemistry/chemistry-cpp.pdf
    - name: Chemistry Workbook
      shortName: Workbook
      url: /merit-badges/chemistry/chemistry-workbook.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '~/data/merit-badges/chemistry/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
