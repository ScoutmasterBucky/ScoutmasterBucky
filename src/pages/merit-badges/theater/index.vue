<page>
title: Theater Merit Badge
badge: theater
resources:
    - name: Theater Class Preparation Page
      shortName: Class Preparation Page
      url: /merit-badges/theater/theater-cpp.pdf
    - name: Theater Workbook
      shortName: Workbook
      url: /merit-badges/theater/theater-workbook.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '../../../../data/merit-badges/theater/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
