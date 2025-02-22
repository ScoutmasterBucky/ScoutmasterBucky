<script setup lang="ts">
const { supernova } = defineProps<{ supernova: String }>();
import supernovaAwards from '~/data/supernova-awards.json';
const detail = supernovaAwards[supernova];
</script>

<template>
    <ScaledContent>
        <a :href="`/nova-lab/supernova/${supernova}/`">
            <div v-if="detail.caption" class="caption">
                {{ detail.caption }}
            </div>
            <img :src="detail.medal" class="wide" />
            <div class="name">{{ detail.name }} Supernova Award</div>
        </a>
    </ScaledContent>
</template>

<style scoped>
a {
    text-decoration: none;
    display: block;
}

.name,
.caption {
    text-align: center;
}
</style>
