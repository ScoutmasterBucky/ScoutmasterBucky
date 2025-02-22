<page>
title: Something from Nothing Nova Award
layout: nova
nova: something-from-nothing
program: venturing-and-sea-scouts
</page>

<script setup lang="ts">
import requirements from '~/data/nova-lab/venturing-and-sea-scouts/something-from-nothing.yaml';
</script>

<template>
    <NovaPage
        :nova="$frontmatter.nova"
        :program="$frontmatter.program"
        :requirements="requirements"
    >
        <p>
            This module is designed for Venturers and Sea Scouts to explore 3D
            printing, and how it is becoming prevalent in everyday life.
        </p>
    </NovaPage>
</template>
