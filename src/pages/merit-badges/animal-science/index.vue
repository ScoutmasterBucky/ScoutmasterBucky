<page>
title: Animal Science Merit Badge
badge: animal-science
resources:
    - name: Animal Science Merit Badge Pamphlet
      url: /merit-badges/animal-science/animal-science-pamphlet.pdf
    - name: Animal Science Class Preparation Page
      shortName: Class Preparation Page
      url: /merit-badges/animal-science/animal-science-cpp.pdf
    - name: Animal Science Workbook
      shortName: Workbook for all (plus pick another)
      url: /merit-badges/animal-science/animal-science-workbook.pdf
    - name: Animal Science Workbook - Avian Option
      shortName: Workbook - Avian Option
      url: /merit-badges/animal-science/animal-science-workbook-avian.pdf
    - name: Animal Science Workbook - Beef Cattle Option
      shortName: Workbook - Beef Cattle Option
      url: /merit-badges/animal-science/animal-science-workbook-beef-cattle.pdf
    - name: Animal Science Workbook - Dairying Option
      shortName: Workbook - Dairying Option
      url: /merit-badges/animal-science/animal-science-workbook-dairying.pdf
    - name: Animal Science Workbook - Hog Option
      shortName: Workbook - Hog Option
      url: /merit-badges/animal-science/animal-science-workbook-hog.pdf
    - name: Animal Science Workbook - Horse Option
      shortName: Workbook - Horse Option
      url: /merit-badges/animal-science/animal-science-workbook-horse.pdf
    - name: Animal Science Workbook - Sheep Option
      shortName: Workbook - Sheep Option
      url: /merit-badges/animal-science/animal-science-workbook-sheep.pdf
    - name: Scoutmaster Bucky's Merit Badge Advancement Quick Reference
      shortName: Advancement Quick Reference
      url: /documents/mbaqr.pdf
    - name: Scoutmaster Bucky's Acknowledgement Form
      shortName: Acknowledgement Form
      url: /documents/mbaf.pdf
</page>

<script setup lang="ts">
import requirements from '~/data/merit-badges/animal-science/requirements.yaml'
</script>

<template>
    <MeritBadgePage
        :badge="$frontmatter.badge"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    />
</template>
