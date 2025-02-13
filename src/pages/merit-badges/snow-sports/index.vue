<page>
title: Snow Sports Merit Badge
badge: snow-sports
resources:
    - name: Snow Sports Workbook - Cross-Country (Nordic) Skiing Option
      shortName: Workbook - Cross-Country (Nordic) Skiing Option
      url: /merit-badges/snow-sports/snow-sports-workbook-cross-country-skiing.pdf
    - name: Snow Sports Workbook - Downhill (Alpine) Skiing Option
      shortName: Workbook - Downhill (Alpine) Skiing Option
      url: /merit-badges/snow-sports/snow-sports-workbook-downhill-skiing.pdf
    - name: Snow Sports Workbook - Snowboarding Option
      shortName: Workbook - Snowboarding Option
      url: /merit-badges/snow-sports/snow-sports-workbook-snowboarding.pdf
    - name: Snow Sports Workbook - Snowshoeing Option
      shortName: Workbook - Snowshoeing Option
      url: /merit-badges/snow-sports/snow-sports-workbook-snowshoeing.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '../../../../data/merit-badges/snow-sports/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
