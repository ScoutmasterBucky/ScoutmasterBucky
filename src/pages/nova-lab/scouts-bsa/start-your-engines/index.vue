<page>
title: Start Your Engines! Nova Award
layout: nova
nova: start-your-engines
program: scouts-bsa
</page>

<script setup lang="ts">
import requirements from '~/data/nova-lab/scouts-bsa/start-your-engines.yaml';
</script>

<template>
    <NovaPage
        :nova="$frontmatter.nova"
        :program="$frontmatter.program"
        :requirements="requirements"
    >
        <p>
            This module is designed for Scouts BSA to help you explore how
            technology affects your life each day.
        </p>
    </NovaPage>
</template>
