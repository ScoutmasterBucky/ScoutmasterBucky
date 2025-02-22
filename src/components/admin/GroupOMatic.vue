<script setup lang="ts">
import { ref } from 'vue';
let data = ref(null);
let config = ref(null);
let best = ref(null);
</script>

<template>
    <h1>Group-O-Matic</h1>

    <p>
        Take a list of names and create groups of a specified size. Repeats the
        process for a series of groupings so you can get maximum interaction
        with new people at each session.
    </p>

    <GroupOMaticStep1
        @file-read="data = $event; config = null; best = null"
        @file-read-error="data = null; config = null; best = null"
    />
    <GroupOMaticStep2
        v-if="data"
        :data="data"
        @config="config = $event; best = null"
    />
    <GroupOMaticStep3
        v-if="data && config"
        :data="data"
        :config="config"
        @best="best = $event; console.log(best)"
    />
    <GroupOMaticStep4
        v-if="best"
        :best="best" />
</template>
