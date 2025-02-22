<page>
title: Fearful Symmetry Nova Award
layout: nova
nova: fearful-symmetry
program: cub-scouts
</page>

<script setup lang="ts">
import requirements from '~/data/nova-lab/cub-scouts/fearful-symmetry.yaml';
</script>

<template>
    <NovaPage
        :nova="$frontmatter.nova"
        :program="$frontmatter.program"
        :requirements="requirements"
    >
        <p>
            This module is designed to help you explore how symmetry affects
            your life each day. Symmetry is something for which most people have
            an intuitive feel, but many have never thought about in enough
            detail to give names to all that they see. Symmetry is a way that a
            figure is like itself. Perhaps one side is a mirror image of the
            other (reflectional symmetry). Perhaps if you turned the image a
            little, you would get the same pattern (rotational symmetry).
            Perhaps there is a repeated pattern along a line, so that if you
            moved one “space” down, the pattern would repeat (translational
            symmetry).
        </p>

        <p>
            Perhaps there is some combination of these. A common pattern is that
            the pattern repeats if you move down the line and reflect across the
            line, as happens with alternating leaf arrangement on a plant (glide
            reflection symmetry). There are far more patterns than names.
        </p>

        <p>
            Symmetry is everywhere. Minerals organize themselves in crystals,
            which are repeating patterns. Plants and animals have many
            interesting symmetries in their shapes. Most artistic traditions in
            the world, and many activities where people design a shape for its
            function, depend on some form of symmetry. In this award, Scouts get
            to explore many aspects of this topic.
        </p>
    </NovaPage>
</template>
