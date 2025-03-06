<script setup lang="ts">
const { event } = defineProps<{
    event: Object;
}>();
let month = event.startDate.local.MMM;
let day = event.startDate.local.d;
let multiple = false;

if (event.endDate) {
    if (event.endDate.local.MMM !== month) {
        month += `/${event.endDate.local.MMM}`;
        multiple = true;
    }

    if (event.endDate.local.d !== day || multiple) {
        day += `-${event.endDate.local.d}`;
        multiple = true;
    }
}

const multipleClass = multiple ? 'multiple' : '';
</script>

<template>
    <div class="calendar">
        <div class="center calendar-month">
            {{ month }}
        </div>
        <div :class="`center calendar-day ${multipleClass}`">{{ day }}</div>
    </div>
</template>

<style scoped>
.calendar {
    border: var(--event-calendar-border);
    border-radius: 5px;
}

.calendar-month {
    font-size: 1.2em;
    background: var(--event-calendar-month-background);
    padding: 0 0.2em;
}

.calendar-day {
    font-size: 2em;
    min-width: 1.7em;
    padding: 0 0.2em;
    min-height: 45px;
}

.calendar-day.multiple {
    font-size: 1.5em;
}
</style>
