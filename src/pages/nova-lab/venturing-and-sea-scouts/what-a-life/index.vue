<page>
title: What a Life! Nova Award
layout: nova
nova: what-a-life
program: venturing-and-sea-scouts
</page>

<script setup lang="ts">
import requirements from '~/data/nova-lab/venturing-and-sea-scouts/what-a-life.yaml';
</script>

<template>
    <NovaPage
        :nova="$frontmatter.nova"
        :program="$frontmatter.program"
        :requirements="requirements"
    >
        <p>
            This module is designed for Venturers and Sea Scouts to encourage
            you to explore different facets of the biological life and living
            systems around you, including macrobiotic and microbiotic life,
            ecology, genetics, and advances in medicine.
        </p>
    </NovaPage>
</template>
