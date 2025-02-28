<page>
title: Animation Merit Badge
badge: animation
resources:
    - name: Animation Class Preparation Page
      shortName: Class Preparation Page
      url: /merit-badges/animation/animation-cpp.pdf
    - name: Animation Workbook
      shortName: Workbook
      url: /merit-badges/animation/animation-workbook.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '~/data/merit-badges/animation/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
