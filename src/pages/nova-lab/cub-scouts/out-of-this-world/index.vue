<page>
title: Out of This World Nova Award
layout: nova
nova: out-of-this-world
program: cub-scouts
</page>

<script setup lang="ts">
import requirements from '../../../../../data/nova-lab/cub-scouts/out-of-this-world.yaml';
</script>

<template>
    <NovaPage
        :nova="$frontmatter.nova"
        :program="$frontmatter.program"
        :requirements="requirements"
    >
        <p>
            This module is designed to help you discover the wonders of space
            exploration.
        </p>
    </NovaPage>
</template>
