<script setup lang="ts">
defineProps<{ code: String; ratio: String }>();
</script>

<template>
    <div class="wrapper">
        <iframe
            :src="`https://www.youtube.com/embed/${code}?modestbranding=1&rel=0`"
            :style="`aspect-ratio: ${ratio};`"
            class="wide"
            frameborder="0"
            allowfullscreen
        ></iframe>
    </div>
</template>

<style scoped>
.wrapper {
    display: flex;
    align-items: center;
    flex-direction: column;
    max-width: 25%;
}

@media (min-width: 768.0001px) and (max-width: 1002px) {
    .wrapper {
        max-width: 30%;
    }
}

@media (max-width: 768px) {
    .wrapper {
        max-width: 100%;
    }
}
</style>
