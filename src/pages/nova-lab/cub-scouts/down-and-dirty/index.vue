<page>
title: Down and Dirty Nova Award
layout: nova
nova: down-and-dirty
program: cub-scouts
</page>

<script setup lang="ts">
import requirements from '~/data/nova-lab/cub-scouts/down-and-dirty.yaml';
</script>

<template>
    <NovaPage
        :nova="$frontmatter.nova"
        :program="$frontmatter.program"
        :requirements="requirements"
    >
        <p>
            This module is designed to help you explore how earth science
            affects your life each day.
        </p>
    </NovaPage>
</template>
