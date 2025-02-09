<script setup lang="ts">
const d = new Date();
const month = d.getMonth() + 1;
const src = `/images/header-month-${month}.jpg`;
</script>

<template>
    <a href="/" aria-label="Scoutmaster Bucky Main Page">
        <img :src="src" height="279" width="1002" alt="Scoutmaster Bucky Banner" />
    </a>
</template>

<style scoped>
img {
    width: 100%;
    height: auto;
    display: block;
}
</style>
