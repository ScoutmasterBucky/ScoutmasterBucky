<page>
title: Fish and Wildlife Management Merit Badge
badge: fish-and-wildlife-management
resources:
    - name: Fish and Wildlife Management Class Preparation Page
      shortName: Class Preparation Page
      url: /merit-badges/fish-and-wildlife-management/fish-and-wildlife-management-cpp.pdf
    - name: Fish and Wildlife Management Workbook
      shortName: Workbook
      url: /merit-badges/fish-and-wildlife-management/fish-and-wildlife-management-workbook.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '../../../../data/merit-badges/fish-and-wildlife-management/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
