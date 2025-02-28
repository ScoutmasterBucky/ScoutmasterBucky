<page>
title: Chess Merit Badge
badge: chess
resources:
    - name: Chess Class Preparation Page
      shortName: Class Preparation Page
      url: /merit-badges/chess/chess-cpp.pdf
    - name: Chess Workbook
      shortName: Workbook
      url: /merit-badges/chess/chess-workbook.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '~/data/merit-badges/chess/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
