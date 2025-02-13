<script setup lang="ts">
defineProps<{
    href: String;
    src?: String;
    subtitle?: String;
    title: String;
}>();
</script>

<template>
    <div class="pad">
        <a :href="href">
            <div v-if="src" class="icon-wrapper">
                <img :src="src" />
            </div>
            <div class="label">
                <div class="title">{{ title }}</div>
                <div v-if="subtitle" class="subtitle">{{ subtitle }}</div>
            </div>
        </a>
    </div>
</template>

<style scoped>
.pad {
    padding: 0.1em;
}

a {
    background: var(--menu-button-background);
    border: var(--menu-button-border);
    border-radius: 0.4em;
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
    flex-shrink: 0;
}

@media (min-width: 480.0001px) and (max-width: 768px) {
    .icon-wrapper {
        display: none;
    }
}

img {
    max-width: 100%;
    max-height: auto;
}

.title {
    color: var(--menu-button-title-color);
    font-weight: bold;
    display: flex;
    justify-content: center;
    text-align: center;
}

a:hover .title {
    color: var(--menu-button-title-color-hover);
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
