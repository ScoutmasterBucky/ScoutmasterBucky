<script setup lang="ts">
defineProps<{
    href: String;
    src?: String;
    subtitle?: String;
    title: String;
}>();
</script>

<template>
    <a :href="href">
        <div v-if="src" class="icon-wrapper">
            <img :src="src" />
        </div>
        <div class="label">
            <div class="title">{{ title }}</div>
            <div v-if="subtitle" class="subtitle">{{ subtitle }}</div>
        </div>
    </a>
</template>

<style scoped>
a {
    background: var(--menu-button-background);
    border: var(--menu-button-border);
    border-radius: 0.3em;
    padding: 0.4em;
    display: flex;
    align-items: center;
    text-decoration: none;
    transition: all 0.2s;
}

a:hover {
    background: var(--menu-button-background-hover);
}

@media (min-width: 468px) and (max-width: 768px) {
    a {
        font-size: 0.9em;
    }
}

.icon-wrapper {
    display: flex;
    height: 35px;
    width: 51px; /* Includes 16px padding */
    padding-right: 16px;
}

img {
    max-width: 100%;
    max-height: auto;
}

@media (max-width: 768px) {
    .icon-wrapper {
        display: none;
    }
}

.title {
    color: var(--menu-button-title-color);
    font-weight: bold;
    display: flex;
    justify-content: center;
    text-align: center;
}

.subtitle {
    color: var(--menu-button-subtitle-color);
    display: flex;
    justify-content: center;
    font-size: 0.8em;
}

@media (max-width: 1024px) {
    .subtitle {
        display: none;
    }
}
</style>
