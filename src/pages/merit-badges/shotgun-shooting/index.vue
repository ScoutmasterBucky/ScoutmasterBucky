<page>
title: Shotgun Shooting Merit Badge
badge: shotgun-shooting
resources:
    - name: Shotgun Shooting Workbook - Muzzleloading Option
      shortName: Workbook - Muzzleloading Option
      url: /merit-badges/shotgun-shooting/shotgun-shooting-workbook-muzzleloading.pdf
    - name: Shotgun Shooting Workbook - Shotgun (Modern Shotshell) Option
      shortName: Workbook - Shotgun (Modern Shotshell) Option
      url: /merit-badges/shotgun-shooting/shotgun-shooting-workbook-shotgun.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '~/data/merit-badges/shotgun-shooting/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
