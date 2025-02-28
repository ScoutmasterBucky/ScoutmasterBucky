<script setup lang="ts">
const { event } = defineProps<{
    event: Object;
}>();
</script>

<template>
    <div class="location">
        <div v-if="event.online" class="online">
            <div class="online-title">ONLINE</div>
            <div v-if="event.startDate.hasTime" class="online-time">
                {{ event.startDate.local.hmma }}
            </div>
            <div v-if="event.startDate.hasTime && !event.isCentral" class="timezone">
                (in your timezone)
            </div>
        </div>
        <div v-else class="in-person">
            <div class="location-address">
                <img src="../assets/map-pin.svg" />
                <div>In-Person</div>
            </div>
            <div
                v-if="
                    !event.online &&
                    !event.differentDays &&
                    event.startDate.hasTime
                "
                class="time-wrapper"
            >
                <div class="time-detail">{{ event.startDate.local.hmma }}</div>
                <div class="timezone" v-if="!event.isCentral">(in your timezone)</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.location {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.online {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.online-title {
    font-size: 0.8em;
    font-weight: bold;
    text-align: center;
}

.online-time {
    font-size: 1.4em;
    text-align: center;
}

.timezone {
    font-size: 0.8em;
    text-align: center;
}

.in-person {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.location-address {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.location-address img {
    max-height: 1.8em;
}

.location-address div {
    font-size: 0.8em;
    font-weight: bold;
    margin: 0 0.5em;
}

.time-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.time-detail {
    font-size: 1.4em;
}
</style>
