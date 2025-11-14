<page>
title: Auctioneering
id: auctioneering
</page>

<script setup lang="ts">
import requirements from '~/data/test-lab/auctioneering/requirements.yaml';
</script>

<template>
    <TestLabPage
        :id="$frontmatter.id"
        :requirements="requirements"
        :resources="$frontmatter.resources"
    >
        <template #additionalResources>
            <p>
                The Auctioneering Badge is a dynamic blend of public speaking
                and salesmanship that offers Scouts the opportunity to develop
                essential communication and persuasion skills. Scouts will learn
                about the history of auctioneering, develop presentation
                techniques, and build rapport with an audience. They’ll engage
                in mock auctions to practice creating demand and closing deals
                while also learning how to handle challenges and uphold ethical
                standards. This badge fosters confidence and critical thinking
                skills that are powerful tools for personal growth, leadership
                roles, and future success.
            </p>
        </template>
    </TestLabPage>
</template>
