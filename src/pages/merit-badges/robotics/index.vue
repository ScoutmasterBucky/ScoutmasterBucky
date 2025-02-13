<page>
title: Robotics Merit Badge
badge: robotics
resources:
    - name: Robotics Class Preparation Page
      shortName: Class Preparation Page
      url: /merit-badges/robotics/robotics-cpp.pdf
    - name: Robotics Workbook
      shortName: Workbook
      url: /merit-badges/robotics/robotics-workbook.pdf
    - name: Scoutmaster Bucky Robot Engineering Notebook
      shortName: Robot Engineering Notebook
      url: /merit-badges/robotics/scoutmaster-bucky-robot-engineering-notebook.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '../../../../data/merit-badges/robotics/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
