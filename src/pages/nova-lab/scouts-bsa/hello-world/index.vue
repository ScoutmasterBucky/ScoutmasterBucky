<page>
title: Hello World Nova Award
layout: nova
nova: hello-world
program: scouts-bsa
</page>

<script setup lang="ts">
import requirements from '~/data/nova-lab/scouts-bsa/hello-world.yaml';
</script>

<template>
    <NovaPage
        :nova="$frontmatter.nova"
        :program="$frontmatter.program"
        :requirements="requirements"
    >
        <p>
            This award explores the world of coding or computer programming.
            Once you know how to code, you can teach a computer to perform
            programs that help you in many ways.
        </p>
    </NovaPage>
</template>
