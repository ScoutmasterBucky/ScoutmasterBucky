<page>
title: Physics
id: physics
</page>

<script setup lang="ts">
import requirements from '~/data/test-lab/physics/requirements.yaml';
</script>

<template>
    <TestLabPage
        :id="$frontmatter.id"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    >
        <template #additionalResources>
            <p>
                Physics is the science of how things move, interact, and
                exist—from the tiniest particles inside atoms to the vast
                galaxies stretching across space. It’s the foundation of modern
                technology, the reason rockets fly, and the explanation behind
                everyday phenomena like why your phone works or how a soccer
                ball curves through the air.<br /><br />
            </p>
            <p>
                By working on these requirements, you’ll explore the mysteries
                of motion, energy, and forces. You’ll learn how the laws of
                nature govern everything around us—from the moment you wake up
                to the time you go to sleep. Whether you’re fascinated by space,
                curious about electricity, or just love asking “why?”, physics
                will help you see the world in a whole new way.<br /><br />
            </p>
            <p>
                Get ready to experiment, discover, and be amazed. Physics isn’t
                just a subject—it’s a journey into how the universe works. And
                it starts right here.
            </p>
            <p>
                So, welcome to the&#160;world of <strong>Physics</strong>—your
                gateway to understanding the incredible forces that shape our
                universe!
            </p>
        </template>
    </TestLabPage>
</template>
