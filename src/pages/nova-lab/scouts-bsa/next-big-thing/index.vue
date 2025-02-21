<page>
title: Next Big Thing Nova Award
layout: nova
nova: next-big-thing
program: scouts-bsa
</page>

<script setup lang="ts">
import requirements from '../../../../../data/nova-lab/scouts-bsa/next-big-thing.yaml';
</script>

<template>
    <NovaPage
        :nova="$frontmatter.nova"
        :program="$frontmatter.program"
        :requirements="requirements"
    >
        <p>
            This award explores the world of product design, which involves
            balancing time, cost, and quality to create something new, usually a
            product that will be sold to consumers or other businesses.
        </p>
    </NovaPage>
</template>
