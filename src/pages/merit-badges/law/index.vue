<page>
title: Law Merit Badge
badge: law
resources:
    - name: Law Class Preparation Page
      shortName: Class Preparation Page
      url: /merit-badges/law/law-cpp.pdf
    - name: Law Workbook
      shortName: Workbook
      url: /merit-badges/law/law-workbook.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '~/data/merit-badges/law/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
