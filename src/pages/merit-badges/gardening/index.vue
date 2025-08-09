<page>
title: Gardening Merit Badge
badge: gardening
resources:
    - name: Gardening Merit Badge Pamphlet
      url: /merit-badges/gardening/gardening-pamphlet.pdf
    - name: Gardening Workbook
      shortName: Workbook
      url: /merit-badges/gardening/gardening-workbook.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '~/data/merit-badges/gardening/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
