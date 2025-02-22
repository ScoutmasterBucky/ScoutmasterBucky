<page>
title: Science Everywhere! Nova Award
layout: nova
nova: science-everywhere
program: cub-scouts
</page>

<script setup lang="ts">
import requirements from '~/data/nova-lab/cub-scouts/science-everywhere.yaml';
</script>

<template>
    <NovaPage
        :nova="$frontmatter.nova"
        :program="$frontmatter.program"
        :requirements="requirements"
    >
        <p>
            This module is designed to help the Scout explore how science
            affects their life each day. Science helps people understand how the
            world around them works.
        </p>
    </NovaPage>
</template>
