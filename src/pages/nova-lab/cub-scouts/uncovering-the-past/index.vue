<page>
title: Uncovering the Past Nova Award
layout: nova
nova: uncovering-the-past
program: cub-scouts
</page>

<script setup lang="ts">
import requirements from '~/data/nova-lab/cub-scouts/uncovering-the-past.yaml';
</script>

<template>
    <NovaPage
        :nova="$frontmatter.nova"
        :program="$frontmatter.program"
        :requirements="requirements"
    >
        <p>
            This module is designed to help you explore the wonders of archaeology.
        </p>
    </NovaPage>
</template>
