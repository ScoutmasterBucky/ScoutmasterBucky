<page>
title: Let It Grow! Nova Award
layout: nova
nova: let-it-grow
program: scouts-bsa
</page>

<script setup lang="ts">
import requirements from '~/data/nova-lab/scouts-bsa/let-it-grow.yaml';
</script>

<template>
    <NovaPage
        :nova="$frontmatter.nova"
        :program="$frontmatter.program"
        :requirements="requirements"
    >
        <p>
This module is designed to help you explore where your food comes from and how agriculture affects your life each day. Agriculture includes growing crops and raising animals to provide food and other products.
        </p>
    </NovaPage>
</template>
