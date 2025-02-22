<page>
title: American Cultures Merit Badge
badge: american-cultures
resources:
    - name: American Cultures Class Preparation Page
      shortName: Class Preparation Page
      url: /merit-badges/american-cultures/american-cultures-cpp.pdf
    - name: American Cultures Workbook
      shortName: Workbook
      url: /merit-badges/american-cultures/american-cultures-workbook.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '~/data/merit-badges/american-cultures/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
