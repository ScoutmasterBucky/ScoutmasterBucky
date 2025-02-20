<page>
title: Nova WILD! Nova Award
layout: nova
nova: nova-wild
program: cub-scouts
</page>

<script setup lang="ts">
import requirements from '../../../../../data/nova-lab/cub-scouts/nova-wild.yaml';
</script>

<template>
    <NovaPage
        :nova="$frontmatter.nova"
        :program="$frontmatter.program"
        :requirements="requirements"
    >
        <p>
            This module is designed to help you learn about wildlife and the
            natural world around you.
        </p>
    </NovaPage>
</template>
