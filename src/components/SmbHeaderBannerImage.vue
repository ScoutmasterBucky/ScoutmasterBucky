<script setup lang="ts">
const d = new Date();
const month = d.getMonth() + 1;
const src = `/images/header-month-${month}.jpg`;
</script>

<template>
    <a href="/" aria-label="Scoutmaster Bucky Main Page" class="unprintable">
        <img :src="src" class="wide" alt="Scoutmaster Bucky Banner" />
    </a>
</template>
