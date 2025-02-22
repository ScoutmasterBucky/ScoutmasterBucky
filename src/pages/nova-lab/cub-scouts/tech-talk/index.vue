<page>
title: Tech Talk Nova Award
layout: nova
nova: tech-talk
program: cub-scouts
</page>

<script setup lang="ts">
import requirements from '~/data/nova-lab/cub-scouts/tech-talk.yaml';
</script>

<template>
    <NovaPage
        :nova="$frontmatter.nova"
        :program="$frontmatter.program"
        :requirements="requirements"
    >
        <p>
            This module is designed to help you explore how technology affects
            your life each day. Technology is the use of tools, machines, or
            scientific knowledge to solve problems, such as computer technology.
            The use of technology can help people control, adapt to, and change
            their environments.
        </p>
    </NovaPage>
</template>
