<page>
title: American Business Merit Badge
badge: american-business
resources:
    - name: American Business Class Preparation Page
      shortName: Class Preparation Page
      url: /merit-badges/american-business/american-business-cpp.pdf
    - name: American Business Workbook
      shortName: Workbook
      url: /merit-badges/american-business/american-business-workbook.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '~/data/merit-badges/american-business/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
