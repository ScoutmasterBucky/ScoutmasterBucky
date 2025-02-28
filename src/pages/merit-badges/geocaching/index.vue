<page>
title: Geocaching Merit Badge
badge: geocaching
resources:
    - name: Geocaching Workbook
      shortName: Workbook
      url: /merit-badges/geocaching/geocaching-workbook.pdf
    - name: Be Prepared (App)
      shortName: Be Prepared (App)
      url: https://be-prepared.github.io/
      description: Simple web-based app to help complete requirements 4, 6, and 9. Best viewed on a mobile device.
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '~/data/merit-badges/geocaching/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
