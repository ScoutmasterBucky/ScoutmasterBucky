<script setup lang="ts">
const { event } = defineProps<{
    event: Object;
}>();
</script>

<template>
    <div class="selectable">
        <div class="big center column bottom-line"><UpcomingEventIcon :event="event" />{{ event.host }}</div>
        <div class="big center">{{ event.title }}</div>
        <div class="time-location">
            <div class="time center">
                <div v-if="event.differentDays">
                    From: {{ event.startDate.local.MMM }}
                    {{ event.startDate.local.d }}<br />
                    Until: {{ event.endDate.local.MMM }}
                    {{ event.endDate.local.d }}
                </div>
                <div v-else>
                    {{ event.startDate.local.MMM }}
                    {{ event.startDate.local.d
                    }}<span v-if="event.startDate.hasTime"
                        ><br />{{ event.startDate.local.hmma }}
                        <span v-if="event.endDate && event.endDate.hasTime"
                            >to {{ event.endDate.local.hmma }}</span
                        ><span v-if="!event.isCentral"
                               ><br />(in your timezone)</span
                        >
                    </span>
                </div>
            </div>
            <div v-if="event.location" class="location">
                <div v-for="line in event.location">
                    {{ line }}
                </div>
            </div>
            <div v-if="event.online" class="online">Online</div>
        </div>
        <UpcomingEventMeritBadges v-if="event.meritBadges" :event="event" />
        <div v-if="event.html" v-html="event.html"></div>
        <UpcomingEventRegistration v-if="event.registrationLink" :event="event" />
    </div>
</template>

<style scoped>
.selectable {
    user-select: text;
}

.big {
    font-size: 32px;
}

.time {
    font-size: 1.4em;
}

.time-location {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    gap: 20px;
}

@media (min-width: 768.0001px) and (max-width: 1024px) {
    .big {
        font-size: 24px;
    }

    .time {
        font-size: 1.3em;
    }
}

@media (min-width: 480.0001px) and (max-width: 768px) {
    .big {
        font-size: 20px;
    }

    .time {
        font-size: 1.2em;
    }
}

@media (max-width: 480px) {
    .big {
        font-size: 16px;
    }

    .time-location {
        flex-direction: column;
    }

    .time {
        font-size: 1.1em;
    }
}

.bottom-line {
    border-bottom: var(--event-details-border);
}
</style>
