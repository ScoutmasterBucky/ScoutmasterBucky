<page>
title: Radio Merit Badge
badge: radio
resources:
    - name: Radio Merit Badge Pamphlet
      url: /merit-badges/radio/radio-pamphlet.pdf
    - name: Radio Class Preparation Page
      shortName: Class Preparation Page
      url: /merit-badges/radio/radio-cpp.pdf
    - name: Radio Workbook - Amateur Radio Option
      shortName: Workbook - Amateur Radio Option
      url: /merit-badges/radio/radio-workbook-amateur-radio.pdf
    - name: Radio Workbook - Radio Broadcasting Option
      shortName: Workbook - Radio Broadcasting Option
      url: /merit-badges/radio/radio-workbook-radio-broadcasting.pdf
    - name: Radio Workbook - Amateur Radio Direction Finding Option
      shortName: Workbook - Amateur Radio Direction Finding Option
      url: /merit-badges/radio/radio-workbook-amateur-radio-direction-finding.pdf
    - name: Radio Workbook - Shortwave and Medium-Wave Listening Option
      shortName: Workbook - Shortwave and Medium-Wave Listening Option
      url: /merit-badges/radio/radio-workbook-shortwave-and-medium-wave-listening.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '~/data/merit-badges/radio/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
