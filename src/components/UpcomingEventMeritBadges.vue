<script setup lang="ts">
import meritBadges from '../../data/merit-badges.json';
const { event } = defineProps<{
    event: Object;
}>();
const badges = (event.meritBadges || []).sort();
</script>

<template>
    <div>
        <a v-for="badge in badges" :href="`/merit-badges/${badge}/`">
            <img :src="meritBadges[badge].image">
            {{ meritBadges[badge].name }}
        </a>
    </div>
</template>

<style scoped>
div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
}

a {
    display: flex;
    align-items: center;
    margin: 0 5px;
}

img {
    width: 15px;
    height: auto;
}
</style>
