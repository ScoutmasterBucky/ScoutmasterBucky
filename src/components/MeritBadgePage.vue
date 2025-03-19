<script setup lang="ts">
const { badge, requirements, resources } = defineProps<{
    badge: String;
    requirements: Object;
    resources: Object;
}>();
import meritBadges from '~/data/merit-badges.json';
import novaAwards from '~/data/nova-awards.json';
import updated from '~/data/updated.json';
const info = meritBadges[badge];
const updatedDate = new Date(updated['merit-badges'][badge]);
const updatedDateStr = updatedDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
});

const related = new Set();

if (info.related) {
    for (const item of info.related) {
        related.add(item);
    }
}

if (info.eagle) {
    related.add({
        name: 'Eagle Rank',
        href: '/scout-ranks/eagle/',
    });
}

for (const novaName of info.novas) {
    const nova = novaAwards['scouts-bsa'][novaName];
    related.add({
        name: `${nova.name} Nova Award`,
        href: `/nova-lab/scouts-bsa/${novaName}/`,
    });
}
</script>

<template>
    <h1>{{ info.name }}</h1>

    <div class="center unprintable">
        <ScaledContent>
            <img :src="info.bucky" alt="Bucky" class="wide" />
        </ScaledContent>
        <ScaledContent>
            <img :src="info.image" alt="Merit Badge" class="wide" />
        </ScaledContent>
    </div>

    <h3>Resources</h3>

    <ul>
        <li v-for="resource in resources">
            <a :href="resource.url">{{ resource.name }}</a>
        </li>
    </ul>

    <h3 v-if="related.size">Related</h3>

    <ul v-if="related.size">
        <li v-for="item in related">
            <a :href="item.href">{{ item.name }}</a>
        </li>
    </ul>

    <slot name="additionalResources" />

    <h2 class="requirements-header">
        <div>{{ info.name }} Requirements</div>
        <div class="updated">
            Current Scouts BSA requirements<br class="updated-break" />
            as of {{ updatedDateStr }}
        </div>
    </h2>

    <Requirements :requirements="requirements" />
</template>

<style scoped>
.requirements-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

@media (max-width: 768px) {
    .requirements-header {
        align-items: flex-start;
        flex-direction: column;
    }
}

.updated {
    font-size: 0.4em;
    font-weight: normal;
    text-transform: none;
    font-style: italic;
}

@media (max-width: 480px) {
    .updated-break {
        display: none;
    }
}
</style>
