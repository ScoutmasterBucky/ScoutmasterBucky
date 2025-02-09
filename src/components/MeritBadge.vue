<script setup lang="ts">
defineProps<{ badge: String; badge2?: String }>();
import meritBadges from '../../merit-badges.json';
</script>

<template>
    <ScaledContent>
        <div v-if="badge2">
            <MeritBadgeImage :badge="badge" :badge2="badge2" />
            <p>
                <a :href="`/merit-badges/${badge}/`">{{
                    meritBadges[badge].name
                }}</a>
                and
                <a :href="`/merit-badges/${badge2}/`">{{
                    meritBadges[badge2].name
                }}</a>
            </p>
        </div>
        <div v-else>
            <MeritBadgeImage :badge="badge" />
            <p>
                <a :href="`/merit-badges/${badge}/`">{{
                    meritBadges[badge].name
                }}</a>
            </p>
        </div>
    </ScaledContent>
</template>

<style scoped>
a {
    text-decoration: none;
}

p {
    font-size: 1.2em;
    text-align: center;
}

@media (max-width: 480px) {
    p {
        font-size: 1em;
    }
}
</style>
