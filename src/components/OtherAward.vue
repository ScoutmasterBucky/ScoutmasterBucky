<script setup lang="ts">
defineProps<{ award: String }>();
import otherAwards from '../../data/other-awards.json';
</script>

<template>
    <ScaledContent>
        <a :href="`/other-awards/${award}/`"
            ><img :src="otherAwards[award].image" class="wide"
        /></a>
        <div class="name">
            <a :href="`/other-awards/${award}/`">{{ otherAwards[award].name }}</a>
        </div>
    </ScaledContent>
</template>

<style scoped>
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
