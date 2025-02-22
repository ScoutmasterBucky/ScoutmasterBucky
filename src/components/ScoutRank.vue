<script setup lang="ts">
defineProps<{ rank: String }>();
import scoutRanks from '~/data/scout-ranks.json';
</script>

<template>
    <ScaledContent>
        <a :href="`/scout-ranks/${rank}/`"
            ><img :src="scoutRanks[rank].image" class="wide"
        /></a>
        <div class="name">
            <a :href="`/scout-ranks/${rank}/`">{{ scoutRanks[rank].name }}</a>
        </div>
    </ScaledContent>
</template>

<style scoped>
a {
    text-decoration: none;
}

.name {
    font-size: 1.2em;
    text-align: center;
}

@media (max-width: 480px) {
    .name {
        font-size: 1em;
    }
}
</style>
