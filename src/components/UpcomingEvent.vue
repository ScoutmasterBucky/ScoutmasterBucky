<script setup lang="ts">
const { event } = defineProps<{
    event: Object;
}>();
import { ref } from 'vue';

const modal = ref(false);
</script>

<template>
    <div class="wrapper" @click="modal = true">
        <div class="top-bar">
            <!-- Icon -->
            <UpcomingEventIcon :event="event" />

            <!-- Calendar -->
            <UpcomingEventCalendar :event="event" />

            <!-- Location -->
            <UpcomingEventLocation :event="event" />
        </div>

        <OnlineBanner v-if="event.online" />

        <div class="title">{{ event.title }}</div>
    </div>

    <Modal v-if="modal" @close="modal = false">
        <UpcomingEventDetails :event="event" />
    </Modal>
</template>

<style scoped>
.wrapper {
    padding: 0.5em;
    overflow: hidden;
}

.top-bar {
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
}

.online-banner {
    position: absolute;
    top: -25px;
    left: -35px;
    transform-origin: bottom right;
    width: 140px;
    overflow: hidden;
    text-align: center;
    transform: rotate(-35deg);
    font-weight: bold;
    font-size: 0.8em;
    padding-top: 0.2em;
    background: var(--event-online-banner-background);
    border: var(--event-online-banner-border);
}

.title {
    text-align: center;
    font-size: 1.4em;
    padding-top: 10px;
}
</style>
