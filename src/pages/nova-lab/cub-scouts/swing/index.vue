<page>
title: Swing Nova Award
layout: nova
nova: swing
program: cub-scouts
</page>

<script setup lang="ts">
import requirements from '../../../../../data/nova-lab/cub-scouts/swing.yaml';
</script>

<template>
    <NovaPage
        :nova="$frontmatter.nova"
        :program="$frontmatter.program"
        :requirements="requirements"
    >
        <p>
            This module is designed to help you explore how engineering and
            simple machines called levers affect your life each day. Engineering
            is considered the application of scientific and mathematical
            principles to create the design, manufacture, and operation of
            structures, machines, processes, and systems. Engineering is very
            closely aligned with technology.
        </p>
    </NovaPage>
</template>
