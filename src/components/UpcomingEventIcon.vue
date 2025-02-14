<script setup lang="ts">
const { event } = defineProps<{
    event: Object;
}>();
</script>

<template>
    <div class="icon">
        <img v-if="event.icon" :src="event.icon" />
    </div>
</template>

<style scoped>
.icon {
    width: 76.5px;
    height: 76.5px;
}

.icon img {
    width: 100%;
    height: auto;
}
</style>
