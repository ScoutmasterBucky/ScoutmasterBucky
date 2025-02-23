<page>
title: Woodwork Merit Badge
badge: woodwork
resources:
    - name: Woodwork Class Preparation Page
      shortName: Class Preparation Page
      url: /merit-badges/woodwork/woodwork-cpp.pdf
    - name: Woodwork Workbook
      shortName: Workbook
      url: /merit-badges/woodwork/woodwork-workbook.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '~/data/merit-badges/woodwork/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
