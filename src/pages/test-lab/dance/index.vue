<page>
title: Dance
id: dance
</page>

<script setup lang="ts">
import requirements from '~/data/test-lab/dance/requirements.yaml';
</script>

<template>
    <TestLabPage
        :id="$frontmatter.id"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    >
        <template #additionalResources>
            <p>
                Dancing is a fun and exciting way to express yourself, stay
                active, and connect with others. Every style of dance—from hip
                hop and ballet to cultural and partner dances—has its own
                rhythm, history, and story to tell. In the Dance Test Lab Badge,
                you’ll learn how to move safely, warm up properly, and
                understand what makes every dance unique. You’ll explore
                different styles of dance, learn about famous dancers, and even
                perform your own routine. Whether you’re new to dancing or
                already love it, this badge will help you build confidence,
                creativity, and coordination while having a great time moving to
                the beat.
            </p>
        </template>
    </TestLabPage>
</template>
