<page>
title: Traffic Safety Merit Badge
badge: traffic-safety
resources:
    - name: Traffic Safety Class Preparation Page
      shortName: Class Preparation Page
      url: /merit-badges/traffic-safety/traffic-safety-cpp.pdf
    - name: Traffic Safety Workbook
      shortName: Workbook
      url: /merit-badges/traffic-safety/traffic-safety-workbook.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '../../../../data/merit-badges/traffic-safety/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
