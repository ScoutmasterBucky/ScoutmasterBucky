<page>
title: Climbing Merit Badge
badge: climbing
resources:
    - name: Climbing Class Preparation Page
      shortName: Class Preparation Page
      url: /merit-badges/climbing/climbing-cpp.pdf
    - name: Climbing Workbook
      shortName: Workbook
      url: /merit-badges/climbing/climbing-workbook.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '~/data/merit-badges/climbing/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
