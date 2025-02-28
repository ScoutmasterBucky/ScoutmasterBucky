<page>
title: Hang On! Nova Award
layout: nova
nova: hang-on
program: venturing-and-sea-scouts
</page>

<script setup lang="ts">
import requirements from '~/data/nova-lab/venturing-and-sea-scouts/hang-on.yaml';
</script>

<template>
    <NovaPage
        :nova="$frontmatter.nova"
        :program="$frontmatter.program"
        :requirements="requirements"
    >
        <p>
            This module is designed to help Venturing and Sea Scouts explore how
            engineering affects their life each day.
        </p>
    </NovaPage>
</template>
