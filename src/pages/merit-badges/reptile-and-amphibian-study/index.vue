<page>
title: Reptile and Amphibian Study Merit Badge
badge: reptile-and-amphibian-study
resources:
    - name: Reptile and Amphibian Study Workbook
      shortName: Workbook
      url: /merit-badges/reptile-and-amphibian-study/reptile-and-amphibian-study-workbook.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '../../../../data/merit-badges/reptile-and-amphibian-study/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
