<page>
title: Citizenship in the Community Merit Badge
badge: citizenship-in-the-community
resources:
    - name: Citizenship in the Community Class Preparation Page
      shortName: Class Preparation Page
      url: /merit-badges/citizenship-in-the-community/citizenship-in-the-community-cpp.pdf
    - name: Citizenship in the Community Workbook
      shortName: Workbook
      url: /merit-badges/citizenship-in-the-community/citizenship-in-the-community-workbook.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '~/data/merit-badges/citizenship-in-the-community/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
