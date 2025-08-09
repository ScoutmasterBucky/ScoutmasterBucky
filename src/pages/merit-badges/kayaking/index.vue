<page>
title: Kayaking Merit Badge
badge: kayaking
resources:
    - name: Kayaking Merit Badge Pamphlet
      url: /merit-badges/kayaking/kayaking-pamphlet.pdf
    - name: Kayaking Class Preparation Page
      shortName: Class Preparation Page
      url: /merit-badges/kayaking/kayaking-cpp.pdf
    - name: Kayaking Workbook
      shortName: Workbook
      url: /merit-badges/kayaking/kayaking-workbook.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '~/data/merit-badges/kayaking/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
