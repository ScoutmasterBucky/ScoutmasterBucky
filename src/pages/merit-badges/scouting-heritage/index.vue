<page>
title: Scouting Heritage Merit Badge
badge: scouting-heritage
resources:
    - name: Scouting Heritage Class Preparation Page
      shortName: Class Preparation Page
      url: /merit-badges/scouting-heritage/scouting-heritage-cpp.pdf
    - name: Scouting Heritage Workbook
      shortName: Workbook
      url: /merit-badges/scouting-heritage/scouting-heritage-workbook.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '../../../../data/merit-badges/scouting-heritage/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
