<page>
title: Citizenship in the World Merit Badge
badge: citizenship-in-the-world
resources:
    - name: Citizenship in the World Merit Badge Pamphlet
      url: /merit-badges/citizenship-in-the-world/citizenship-in-the-world-pamphlet.pdf
    - name: Citizenship in the World Class Preparation Page
      shortName: Class Preparation Page
      url: /merit-badges/citizenship-in-the-world/citizenship-in-the-world-cpp.pdf
    - name: Citizenship in the World Workbook
      shortName: Workbook
      url: /merit-badges/citizenship-in-the-world/citizenship-in-the-world-workbook.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '~/data/merit-badges/citizenship-in-the-world/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
