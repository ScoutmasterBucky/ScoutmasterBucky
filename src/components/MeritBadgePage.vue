<script setup lang="ts">
const { badge, requirements, resources } = defineProps<{
    badge: String;
    requirements: Object;
    resources: Object;
}>();
import meritBadges from '~/data/merit-badges.json';
import otherAwards from '~/data/other-awards.json';
import scoutRanks from '~/data/scout-ranks.json';
import updated from '~/data/updated.json';
const info = meritBadges[badge];
const updatedDate = new Date(updated['merit-badges'][badge]);
const updatedDateStr = updatedDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
});

const related = new Set();

for (const rankName of info.ranks) {
    const rank = scoutRanks[rankName];
    related.add({
        name: `${rank.name} Rank`,
        href: `/scout-ranks/${rankName}/`,
    });
}

for (const otherAwardName of info['other-awards']) {
    const otherAward = otherAwards[otherAwardName];
    related.add({
        name: otherAward.name,
        href: `/other-awards/${otherAwardName}/`,
    });
}

function checkRequirementsForResources(reqs) {
    for (const req of reqs) {
        if (req.resources && req.resources.length > 0) {
            return true;
        }

        if (req.children) {
            if (checkRequirementsForResources(req.children)) {
                return true;
            }
        }
    }

    return false;
}

let hasResources = checkRequirementsForResources(requirements);
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

    <ResourcesToggle v-if="hasResources" class="gap-bottom" client:load />
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

.gap-bottom {
    margin-bottom: 0.5em;
}
</style>
