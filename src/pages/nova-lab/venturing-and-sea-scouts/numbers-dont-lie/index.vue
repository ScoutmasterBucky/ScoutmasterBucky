<page>
title: Numbers Don't Lie Nova Award
layout: nova
nova: numbers-dont-lie
program: venturing-and-sea-scouts
</page>

<script setup lang="ts">
import requirements from '../../../../../data/nova-lab/venturing-and-sea-scouts/numbers-dont-lie.yaml';
</script>

<template>
    <NovaPage
        :nova="$frontmatter.nova"
        :program="$frontmatter.program"
        :requirements="requirements"
    >
        <p>
            This module is designed to help the Venturer explore how math
            affects his or her life each day.
        </p>
    </NovaPage>
</template>
