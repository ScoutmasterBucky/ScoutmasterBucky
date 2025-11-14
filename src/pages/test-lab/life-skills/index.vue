<page>
title: Life Skills
id: life-skills
</page>

<script setup lang="ts">
import requirements from '~/data/test-lab/life-skills/requirements.yaml';
</script>

<template>
    <TestLabPage
        :id="$frontmatter.id"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    >
        <template #additionalResources>
            <p>
                The Life Skills Badge helps Scouts develop a variety of
                practical skills that are essential for independent living and
                personal growth. It covers areas such as health, household
                management, finance, social interactions, employment readiness,
                and transportation. Scouts learn how to maintain their physical
                and mental well-being, manage personal finances, care for their
                living spaces, communicate effectively with others, explore
                career options, and safely navigate transportation systems. By
                completing the requirements, Scouts gain valuable tools for
                responsible decision-making and become better prepared to take
                on adult responsibilities.
            </p>
        </template>
    </TestLabPage>
</template>
