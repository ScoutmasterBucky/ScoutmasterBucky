<page>
title: Photography Merit Badge
badge: photography
resources:
    - name: Photography Merit Badge Pamphlet
      url: /merit-badges/photography/photography-pamphlet.pdf
    - name: Photography Class Preparation Page
      shortName: Class Preparation Page
      url: /merit-badges/photography/photography-cpp.pdf
    - name: Photography Workbook
      shortName: Workbook
      url: /merit-badges/photography/photography-workbook.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '~/data/merit-badges/photography/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
