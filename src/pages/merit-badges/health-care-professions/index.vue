<page>
title: Health Care Professions Merit Badge
badge: health-care-professions
resources:
    - name: Health Care Professions Class Preparation Page
      shortName: Class Preparation Page
      url: /merit-badges/health-care-professions/health-care-professions-cpp.pdf
    - name: Health Care Professions Workbook
      shortName: Workbook
      url: /merit-badges/health-care-professions/health-care-professions-workbook.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '../../../../data/merit-badges/health-care-professions/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
