<page>
title: Pets Merit Badge
badge: pets
resources:
    - name: Pets Class Preparation Page
      shortName: Class Preparation Page
      url: /merit-badges/pets/pets-cpp.pdf
    - name: Pets Workbook
      shortName: Workbook
      url: /merit-badges/pets/pets-workbook.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '~/data/merit-badges/pets/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
