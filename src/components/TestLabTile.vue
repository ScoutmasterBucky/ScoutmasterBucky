<script setup lang="ts">
defineProps<{ href: String; name: String; src: String }>();
</script>

<template>
    <Tile>
        <a :href="href" target="_blank">
            <img :src="src" :alt="name" />
            <div>{{ name }}</div>
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
