<page>
title: Sports Merit Badge
badge: sports
resources:
    - name: Sports Merit Badge Pamphlet
      url: /merit-badges/sports/sports-pamphlet.pdf
    - name: Sports Workbook
      shortName: Workbook
      url: /merit-badges/sports/sports-workbook.pdf
    - name: Scoutmaster Bucky's - Sports Merit Badge tracking Sheets (for requirement 4a)
      shortName: Sports 4a Tracking Sheets
      url: /merit-badges/sports/scoutmaster-bucky-sports-merit-badge-tracking-sheets.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '~/data/merit-badges/sports/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
