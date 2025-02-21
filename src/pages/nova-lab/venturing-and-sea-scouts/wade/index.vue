<page>
title: Wade! Nova Award
layout: nova
nova: wade
program: venturing-and-sea-scouts
</page>

<script setup lang="ts">
import requirements from '../../../../../data/nova-lab/venturing-and-sea-scouts/wade.yaml';
</script>

<template>
    <NovaPage
        :nova="$frontmatter.nova"
        :program="$frontmatter.program"
        :requirements="requirements"
    >
        <p>
            This module is designed to help you explore how water affects your
            life every day. **Wade** is part of the Science category.
        </p>
    </NovaPage>
</template>
