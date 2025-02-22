<page>
title: Launch! Nova Award
layout: nova
nova: launch
program: venturing-and-sea-scouts
</page>

<script setup lang="ts">
import requirements from '~/data/nova-lab/venturing-and-sea-scouts/launch.yaml';
</script>

<template>
    <NovaPage
        :nova="$frontmatter.nova"
        :program="$frontmatter.program"
        :requirements="requirements"
    >
        <p>
            This module is designed for Venturing and Sea Scouts to explore how
            science affects your life each day.
        </p>
    </NovaPage>
</template>
