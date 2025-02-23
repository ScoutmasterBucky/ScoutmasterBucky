<page>
title: Splash! Nova Award
layout: nova
nova: splash
program: scouts-bsa
</page>

<script setup lang="ts">
import requirements from '~/data/nova-lab/scouts-bsa/splash.yaml';
</script>

<template>
    <NovaPage
        :nova="$frontmatter.nova"
        :program="$frontmatter.program"
        :requirements="requirements"
    >
        <p>
            This module is designed for Scouts BSA to explore how water affects
            your life every day. Splash! is part of the Science category.
        </p>
    </NovaPage>
</template>
