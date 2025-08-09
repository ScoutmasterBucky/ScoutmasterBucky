<page>
title: Rifle Shooting Merit Badge
badge: rifle-shooting
resources:
    - name: Rifle Shooting Merit Badge Pamphlet
      url: /merit-badges/rifle-shooting/rifle-shooting-pamphlet.pdf
    - name: Rifle Shooting Workbook - Air Rifle Shooting (BB or Pellet) Option
      shortName: Workbook - Air Rifle Shooting (BB or Pellet) Option
      url: /merit-badges/rifle-shooting/rifle-shooting-workbook-air-rifle-shooting.pdf
    - name: Rifle Shooting Workbook - Muzzleloading Rifle Shooting Option
      shortName: Workbook - Muzzleloading Rifle Shooting Option
      url: /merit-badges/rifle-shooting/rifle-shooting-workbook-muzzleloading-rifle-shooting.pdf
    - name: Rifle Shooting Workbook - Rifle Shooting (Modern Cartridge Type) Option
      shortName: Workbook - Rifle Shooting (Modern Cartridge Type) Option
      url: /merit-badges/rifle-shooting/rifle-shooting-workbook-rifle-shooting.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '~/data/merit-badges/rifle-shooting/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
