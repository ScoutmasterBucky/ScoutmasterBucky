<page>
title: Emergency Preparedness Merit Badge
badge: emergency-preparedness
resources:
    - name: Emergency Preparedness Class Preparation Page
      shortName: Class Preparation Page
      url: /merit-badges/emergency-preparedness/emergency-preparedness-cpp.pdf
    - name: Emergency Preparedness Workbook
      shortName: Workbook
      url: /merit-badges/emergency-preparedness/emergency-preparedness-workbook.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '../../../../data/merit-badges/emergency-preparedness/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
