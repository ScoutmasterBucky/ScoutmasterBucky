<script setup lang="ts">
defineProps<{ badge: String; badge2?: String }>();
import meritBadges from '~/data/merit-badges.json';
</script>

<template>
    <div v-if="badge2" class="scaled">
        <MeritBadgeImage :badge="badge" :badge2="badge2" />
        <div class="name">
            <a :href="`/merit-badges/${badge}/`">{{
                meritBadges[badge].name
            }}</a>
            and
            <a :href="`/merit-badges/${badge2}/`">{{
                meritBadges[badge2].name
            }}</a>
        </div>
    </div>
    <div v-else class="scaled">
        <MeritBadgeImage :badge="badge" />
        <div class="name">
            <a :href="`/merit-badges/${badge}/`">{{
                meritBadges[badge].name
            }}</a>
        </div>
    </div>
</template>

<style scoped>
a {
    text-decoration: none;
}

.name {
    font-size: 1.2em;
    text-align: center;
}

.scaled {
    width: 20%;
    padding: 0.5em;
}

@media (min-width: 768.0001px) and (max-width: 1024px) {
    .scaled {
        width: 25%;
    }
}

@media (min-width: 480.0001px) and (max-width: 768px) {
    .scaled {
        width: 33%;
    }
}

@media (max-width: 480px) {
    .name {
        font-size: 1em;
    }

    .scaled {
        width: 50%;
    }
}
</style>
