<script setup lang="ts">
const { items } = defineProps<{
    items: Object;
}>();
</script>

<template>
    <div class="resource-toggle hidden">
        <div class="resources v-gap">
            <div v-if="items.length === 1" class="resource-heading">
                Resource:
            </div>
            <div v-else class="resource-heading">Resources:</div>
            <ul>
                <li v-for="item of items">
                    <span v-if="item.href"
                        ><a
                            :href="item.href"
                            target="_blank"
                            v-html="item.text"
                        ></a>
                        ({{ item.type }})</span
                    >
                    <span v-else v-html="item.text"></span>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
.v-gap {
    padding-bottom: 8px;
}

.resources {
    width: 100%;
    background-color: #dfe2de;
}

@media print {
    .resources {
        background-color: transparent;
    }
}

.resource-heading {
    font-style: italic;
}

.resource-toggle {
    overflow: hidden;
    interpolate-size: allow-keywords;
    transition: height 0.3s ease;
}

.hidden {
    height: 0;
}
</style>
