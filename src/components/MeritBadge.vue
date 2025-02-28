<script setup lang="ts">
defineProps<{ badge: String; badge2?: String }>();
import meritBadges from '~/data/merit-badges.json';
</script>

<template>
    <ScaledContent>
        <div v-if="badge2">
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
        <div v-else>
            <MeritBadgeImage :badge="badge" />
            <div class="name">
                <a :href="`/merit-badges/${badge}/`">{{
                    meritBadges[badge].name
                }}</a>
            </div>
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
