<page>
title: Game Design Merit Badge
badge: game-design
resources:
    - name: Game Design Class Preparation Page
      shortName: Class Preparation Page
      url: /merit-badges/game-design/game-design-cpp.pdf
    - name: Game Design Workbook
      shortName: Workbook
      url: /merit-badges/game-design/game-design-workbook.pdf
    - name: Scoutmaster Bucky Game Design Notebook
      shortName: Notebook
      url: /merit-badges/game-design/scoutmaster-bucky-game-design-notebook.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '~/data/merit-badges/game-design/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
