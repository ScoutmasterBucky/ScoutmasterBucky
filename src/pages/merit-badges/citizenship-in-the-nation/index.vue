<page>
title: Citizenship in the Nation Merit Badge
badge: citizenship-in-the-nation
resources:
    - name: Citizenship in the Nation Class Preparation Page
      shortName: Class Preparation Page
      url: /merit-badges/citizenship-in-the-nation/citizenship-in-the-nation-cpp.pdf
    - name: Citizenship in the Nation Workbook
      shortName: Workbook
      url: /merit-badges/citizenship-in-the-nation/citizenship-in-the-nation-workbook.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '../../../../data/merit-badges/citizenship-in-the-nation/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
