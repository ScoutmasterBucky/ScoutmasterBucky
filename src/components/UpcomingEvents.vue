<script setup lang="ts">
import { DateTime } from 'luxon';
import eventList from '~/data/events.yaml';

function areDaysDifferent(event) {
    if (!event.end) {
        return false;
    }

    return event.start.split(' ')[0] !== event.end.split(' ')[0];
}

function formatDateLocal(date: Date, format: string) {
    return DateTime.fromJSDate(date).toFormat(format);
}

function toDate(dateString: string | undefined) {
    if (!dateString) {
        return;
    }

    let date = new Date();
    let hasTime = false;

    if (!dateString.includes(' ')) {
        date = DateTime.fromFormat(dateString, 'yyyy-MM-dd').toJSDate();
    } else {
        date = DateTime.fromFormat(dateString, 'yyyy-MM-dd H:mm', {
            zone: 'America/Chicago',
        }).toJSDate();
        hasTime = true;
    }

    const timestamp = date.getTime();

    return {
        date,
        hasTime,
        local: {
            MMM: formatDateLocal(date, 'MMM'),
            d: formatDateLocal(date, 'd'),
            hmma: formatDateLocal(date, 'h:mm a'),
        },
        timestamp,
    };
}

const filtered = (eventList || [])
    .map((event: any) => {
        const startDate = toDate(event.start);
        const endDate = toDate(event.end);
        const d = new Date();
        const offset1 =
            DateTime.fromObject(d).setZone('America/Chicago').offset;
        const offset2 = DateTime.fromObject(d).offset;

        return {
            ...event,
            isCentral: offset1 === offset2,
            startDate,
            endDate,
            hideDate: endDate || startDate,
            differentDays: areDaysDifferent(event),
        };
    })
    .filter((event: any) => (event.hideDate?.timestamp ?? 0) > Date.now());
</script>

<template>
    <h2>Upcoming Events</h2>

    <TileWrapper>
        <Tile v-for="event in filtered">
            <UpcomingEvent :event="event" />
        </Tile>
    </TileWrapper>
</template>
