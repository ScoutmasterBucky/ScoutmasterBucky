<page>
title: Citizenship in Society Merit Badge
badge: citizenship-in-society
resources:
    - name: Citizenship in Society Class Preparation Page
      shortName: Class Preparation Page
      url: /merit-badges/citizenship-in-society/citizenship-in-society-cpp.pdf
    - name: Citizenship in Society Workbook
      shortName: Workbook
      url: /merit-badges/citizenship-in-society/citizenship-in-society-workbook.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '../../../../data/merit-badges/citizenship-in-society/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
