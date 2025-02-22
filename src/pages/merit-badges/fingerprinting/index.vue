<page>
title: Fingerprinting Merit Badge
badge: fingerprinting
resources:
    - name: Fingerprinting Class Preparation Page
      shortName: Class Preparation Page
      url: /merit-badges/fingerprinting/fingerprinting-cpp.pdf
    - name: Fingerprinting Workbook
      shortName: Workbook
      url: /merit-badges/fingerprinting/fingerprinting-workbook.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '~/data/merit-badges/fingerprinting/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
