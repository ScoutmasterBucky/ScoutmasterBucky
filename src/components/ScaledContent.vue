<script setup lang="ts">
// align can be "left", "right", "center" or omitted.
const { align } = defineProps<{
    align?: String;
}>();

const alignClass = ['left', 'right', 'center'].includes(align)
    ? align
    : 'none';
</script>

<template>
    <div v-if="align === 'none'" class="scaled"><slot /></div>
    <div v-else :class="align">
        <div class="scaled"><slot /></div>
    </div>
</template>

<style scoped>
.scaled {
    padding: 9px;
    max-width: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    flex-direction: column;
}

.left, .right, .center {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.left {
    float: left;
}

.right {
    float: right;
}

.center {
    width: 100%;
    display: flex;
}

@media (min-width: 768.0001px) and (max-width: 1024px) {
    .scaled {
        /* 250 / 1024 = 24.4% */
        width: 24.4vw;
    }
}

@media (min-width: 480.0001px) and (max-width: 768px) {
    .scaled {
        /* 250 / 768 = 32.6% */
        width: 32.6vw;
    }
}

@media (max-width: 480px) {
    .scaled {
        width: min(100%, 250px);
    }

    .left, .right {
        width: 100%;
        float: none;
    }
}
</style>
