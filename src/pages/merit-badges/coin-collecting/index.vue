<page>
title: Coin Collecting Merit Badge
badge: coin-collecting
resources:
    - name: Coin Collecting Merit Badge Pamphlet
      url: /merit-badges/coin-collecting/coin-collecting-pamphlet.pdf
    - name: Coin Collecting Class Preparation Page
      shortName: Class Preparation Page
      url: /merit-badges/coin-collecting/coin-collecting-cpp.pdf
    - name: Coin Collecting Workbook
      shortName: Workbook
      url: /merit-badges/coin-collecting/coin-collecting-workbook.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '~/data/merit-badges/coin-collecting/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
