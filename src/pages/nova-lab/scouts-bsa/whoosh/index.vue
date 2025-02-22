<page>
title: Whoosh! Nova Award
layout: nova
nova: whoosh
program: scouts-bsa
</page>

<script setup lang="ts">
import requirements from '~/data/nova-lab/scouts-bsa/whoosh.yaml';
</script>

<template>
    <NovaPage
        :nova="$frontmatter.nova"
        :program="$frontmatter.program"
        :requirements="requirements"
    >
        <p>
This module is designed to help Scouts BSA explore how engineering affects your life each day.
        </p>
    </NovaPage>
</template>
