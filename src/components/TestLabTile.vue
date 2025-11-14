<script setup lang="ts">
defineProps<{ id: String }>();
import testLab from '~/data/test-lab.json';
</script>

<template>
    <Tile>
        <a :href="'/test-lab/' + id + '/'">
            <img :src="testLab[id].image" :alt="testLab[id].name" />
            <div>{{ testLab[id].name }}</div>
        </a>
    </Tile>
</template>

<style scoped>
a {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    padding: 0.5em;
    text-decoration: none;
    color: inherit;
}

img {
    height: 55px;
    width: auto;
}

div {
    font-weight: bold;
    color: var(--smb-text-color);
}
</style>
