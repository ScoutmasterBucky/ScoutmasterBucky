<page>
title: Communication Merit Badge
badge: communication
resources:
    - name: Communication Class Preparation Page
      shortName: Class Preparation Page
      url: /merit-badges/communication/communication-cpp.pdf
    - name: Communication Workbook
      shortName: Workbook
      url: /merit-badges/communication/communication-workbook.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '../../../../data/merit-badges/communication/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
