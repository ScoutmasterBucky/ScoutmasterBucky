<script setup lang="ts">
const { event } = defineProps<{
    event: Object;
}>();
</script>

<template>
    <div class="calendar">
        <div class="calendar-month">
            {{ event.startDate.local.MMM }}
        </div>
        <div class="calendar-day">{{ event.startDate.local.d }}</div>
    </div>
</template>

<style scoped>
.calendar {
    border: var(--event-calendar-border);
    border-radius: 5px;
}

.calendar-month {
    text-align: center;
    font-size: 1.2em;
    background: var(--event-calendar-month-background);
}

.calendar-day {
    text-align: center;
    font-size: 2em;
    width: 1.7em;
}
</style>
