<page>
title: Dog Care Merit Badge
badge: dog-care
resources:
    - name: Dog Care Merit Badge Pamphlet
      url: /merit-badges/dog-care/dog-care-pamphlet.pdf
    - name: Dog Care Class Preparation Page
      shortName: Class Preparation Page
      url: /merit-badges/dog-care/dog-care-cpp.pdf
    - name: Dog Care Workbook
      shortName: Workbook
      url: /merit-badges/dog-care/dog-care-workbook.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '~/data/merit-badges/dog-care/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
