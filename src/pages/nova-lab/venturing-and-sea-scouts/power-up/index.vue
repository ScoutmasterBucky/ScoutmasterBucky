<page>
title: Power Up Nova Award
layout: nova
nova: power-up
program: venturing-and-sea-scouts
</page>

<script setup lang="ts">
import requirements from '~/data/nova-lab/venturing-and-sea-scouts/power-up.yaml';
</script>

<template>
    <NovaPage
        :nova="$frontmatter.nova"
        :program="$frontmatter.program"
        :requirements="requirements"
    >
        <p>
            This module is designed to help Venturers or Sea Scouts explore how
            technology affects their life each day.
        </p>
    </NovaPage>
</template>
