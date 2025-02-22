<script setup lang="ts">
const { supernova } = defineProps<{ supernova: String }>();
import supernovaAwards from '~/data/supernova-awards.json';
const detail = supernovaAwards[supernova];
</script>

<template>
    <h1>{{ detail.name }} Supernova Award</h1>

    <MeritBadgeList>
        <ScaledContent>
            <img :src="detail.medal" class="wide" />
        </ScaledContent>
        <ScaledContent>
            <img :src="detail.award" class="wide" />
        </ScaledContent>
    </MeritBadgeList>
</template>
