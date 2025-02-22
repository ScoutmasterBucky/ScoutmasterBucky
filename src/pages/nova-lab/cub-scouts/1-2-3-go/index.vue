<page>
title: 1-2-3 Go! Nova Award
layout: nova
nova: 1-2-3-go
program: cub-scouts
</page>

<script setup lang="ts">
import requirements from '~/data/nova-lab/cub-scouts/1-2-3-go.yaml';
</script>

<template>
    <NovaPage
        :nova="$frontmatter.nova"
        :program="$frontmatter.program"
        :requirements="requirements"
    >
        <p>
            This module is designed to help you explore how math affects your
            life each day.
        </p>
    </NovaPage>
</template>
