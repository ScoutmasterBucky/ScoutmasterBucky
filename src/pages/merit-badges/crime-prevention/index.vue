<page>
title: Crime Prevention Merit Badge
badge: crime-prevention
resources:
    - name: Crime Prevention Class Preparation Page
      shortName: Class Preparation Page
      url: /merit-badges/crime-prevention/crime-prevention-cpp.pdf
    - name: Crime Prevention Workbook
      shortName: Workbook
      url: /merit-badges/crime-prevention/crime-prevention-workbook.pdf
    - name: Scoutmaster Bucky Crime Prevention Journal
      shortName: Journal
      url: /merit-badges/crime-prevention/scoutmaster-bucky-crime-prevention-journal.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '../../../../data/merit-badges/crime-prevention/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
