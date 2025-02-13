<page>
title: Automotive Maintenance Merit Badge
badge: automotive-maintenance
resources:
    - name: Automotive Maintenance Class Preparation Page
      shortName: Class Preparation Page
      url: /merit-badges/automotive-maintenance/automotive-maintenance-cpp.pdf
    - name: Automotive Maintenance Workbook
      shortName: Workbook
      url: /merit-badges/automotive-maintenance/automotive-maintenance-workbook.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '../../../../data/merit-badges/automotive-maintenance/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
