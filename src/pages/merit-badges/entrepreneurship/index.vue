<page>
title: Entrepreneurship Merit Badge
badge: entrepreneurship
resources:
    - name: Entrepreneurship Class Preparation Page
      shortName: Class Preparation Page
      url: /merit-badges/entrepreneurship/entrepreneurship-cpp.pdf
    - name: Entrepreneurship Workbook
      shortName: Workbook
      url: /merit-badges/entrepreneurship/entrepreneurship-workbook.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '../../../../data/merit-badges/entrepreneurship/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
