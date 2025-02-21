<page>
title: Shoot! Nova Award
layout: nova
nova: shoot
program: scouts-bsa
</page>

<script setup lang="ts">
import requirements from '../../../../../data/nova-lab/scouts-bsa/shoot.yaml';
</script>

<template>
    <NovaPage
        :nova="$frontmatter.nova"
        :program="$frontmatter.program"
        :requirements="requirements"
    >
        <p>
            This module is designed for Scouts BSA to explore how projectiles
            and space affect your life each day.
        </p>
    </NovaPage>
</template>
