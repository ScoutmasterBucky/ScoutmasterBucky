<page>
title: Up and Away Nova Award
layout: nova
nova: up-and-away
program: scouts-bsa
</page>

<script setup lang="ts">
import requirements from '../../../../../data/nova-lab/scouts-bsa/up-and-away.yaml';
</script>

<template>
    <NovaPage
        :nova="$frontmatter.nova"
        :program="$frontmatter.program"
        :requirements="requirements"
    >
        <p>
            This award explores the world of fluid dynamics, and how it affects
            your everyday life. Fluid dynamics is the study of how fluids
            (liquids, gases, and plasmas) behave and interact with other
            materials.
        </p>
    </NovaPage>
</template>
