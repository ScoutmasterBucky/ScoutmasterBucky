<page>
title: Cub Scouts Can Code Nova Award
layout: nova
nova: cub-scouts-can-code
program: cub-scouts
</page>

<script setup lang="ts">
import requirements from '~/data/nova-lab/cub-scouts/cub-scouts-can-code.yaml';
</script>

<template>
    <NovaPage
        :nova="$frontmatter.nova"
        :program="$frontmatter.program"
        :requirements="requirements"
    >
        <p>
            Did you ever wonder how computers know what to do? This module is
            designed to help you explore how people instruct computers and how
            they affect your everyday life.
        </p>
    </NovaPage>
</template>
