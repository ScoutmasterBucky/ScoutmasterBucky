<page>
title: Designed to Crunch Nova Award
layout: nova
nova: designed-to-crunch
program: scouts-bsa
</page>

<script setup lang="ts">
import requirements from '../../../../../data/nova-lab/scouts-bsa/designed-to-crunch.yaml';
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
