<page>
title: Wilderness Survival Merit Badge
badge: wilderness-survival
resources:
    - name: Wilderness Survival Merit Badge Pamphlet
      url: /merit-badges/wilderness-survival/wilderness-survival-pamphlet.pdf
    - name: Wilderness Survival Class Preparation Page
      shortName: Class Preparation Page
      url: /merit-badges/wilderness-survival/wilderness-survival-cpp.pdf
    - name: Wilderness Survival Workbook
      shortName: Workbook
      url: /merit-badges/wilderness-survival/wilderness-survival-workbook.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '~/data/merit-badges/wilderness-survival/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
