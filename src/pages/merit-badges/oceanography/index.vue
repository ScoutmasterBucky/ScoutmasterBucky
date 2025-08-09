<page>
title: Oceanography Merit Badge
badge: oceanography
resources:
    - name: Oceanography Merit Badge Pamphlet
      url: /merit-badges/oceanography/oceanography-pamphlet.pdf
    - name: Oceanography Workbook
      shortName: Workbook
      url: /merit-badges/oceanography/oceanography-workbook.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '~/data/merit-badges/oceanography/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
