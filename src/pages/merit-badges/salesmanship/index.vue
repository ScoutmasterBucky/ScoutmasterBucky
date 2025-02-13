<page>
title: Salesmanship Merit Badge
badge: salesmanship
resources:
    - name: Salesmanship Class Preparation Page
      shortName: Class Preparation Page
      url: /merit-badges/salesmanship/salesmanship-cpp.pdf
    - name: Salesmanship Workbook
      shortName: Workbook
      url: /merit-badges/salesmanship/salesmanship-workbook.pdf
    - name: Scoutmaster Bucky Sales Plan Template
      shortName: Sales Plan Template
      url: /merit-badges/salesmanship/scoutmaster-bucky-salesmanship-merit-badge-sales-plan-template.docx
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '../../../../data/merit-badges/salesmanship/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
