<page>
title: Pulp and Paper Merit Badge
badge: pulp-and-paper
resources:
    - name: Pulp and Paper Class Preparation Page
      shortName: Class Preparation Page
      url: /merit-badges/pulp-and-paper/pulp-and-paper-cpp.pdf
    - name: Pulp and Paper Workbook
      shortName: Workbook
      url: /merit-badges/pulp-and-paper/pulp-and-paper-workbook.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '../../../../data/merit-badges/pulp-and-paper/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
