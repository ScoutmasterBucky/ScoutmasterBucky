<page>
title: Sewing and Needlework
id: sewing-and-needlework
</page>

<script setup lang="ts">
import requirements from '~/data/test-lab/sewing-and-needlework/requirements.yaml';
</script>

<template>
    <TestLabPage
        :id="$frontmatter.id"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    >
        <template #additionalResources>
            <p>
                Sewing is using a needle and thread to make stitches and combine
                textiles by hand or machine. Needlework is decorative sewing and
                other textile arts. In this badge, you will investigate several
                types of sewing and needlework. You will learn basic hand and
                machine sewing skills and make several small, practical projects
                using your new skills!
            </p>
        </template>
    </TestLabPage>
</template>
