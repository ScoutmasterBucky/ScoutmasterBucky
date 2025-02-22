<page>
title: Mendels Minions Nova Award
layout: nova
nova: mendels-minions
program: scouts-bsa
</page>

<script setup lang="ts">
import requirements from '~/data/nova-lab/scouts-bsa/mendels-minions.yaml';
</script>

<template>
    <NovaPage
        :nova="$frontmatter.nova"
        :program="$frontmatter.program"
        :requirements="requirements"
    >
        <p>
            This module is designed for Scouts BSA to help you explore how
            genetic information affects your life every day. It is part of the
            Science category.
        </p>
    </NovaPage>
</template>
