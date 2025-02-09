<script setup lang="ts">
defineProps<{ badge: String; badge2?: String }>();
import meritBadges from '../../merit-badges.json';
</script>

<template>
    <svg
        v-if="badge2"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 200 200"
    >
        <a :href="`/merit-badges/${badge}/`">
            <image
                :xlink:href="meritBadges[badge].image"
                x="0"
                y="0"
                width="150"
                height="150"
            />
        </a>
        <a :href="`/merit-badges/${badge2}/`">
            <image
                :xlink:href="meritBadges[badge2].image"
                x="50"
                y="50"
                width="150"
                height="150"
            />
        </a>
    </svg>

    <a v-else :href="`/merit-badges/${badge}/`">
        <img :src="meritBadges[badge].image" width="200" height="200" />
    </a>
</template>

<style scoped>
svg,
img {
    aspect-ratio: auto 200 / 200;
    width: 100%;
    height: auto;
}
</style>
