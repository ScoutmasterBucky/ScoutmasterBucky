<page>
title: Lifesaving Merit Badge
badge: lifesaving
resources:
    - name: Lifesaving Merit Badge Pamphlet
      url: /merit-badges/lifesaving/lifesaving-pamphlet.pdf
    - name: Lifesaving Workbook
      shortName: Workbook
      url: /merit-badges/lifesaving/lifesaving-workbook.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '~/data/merit-badges/lifesaving/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
