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
    <div v-if="align === 'none'" class="none"><slot /></div>
    <div v-else :class="`outer ${alignClass}`">
        <div class="inner"><slot /></div>
    </div>
</template>

<style scoped>
.outer, .none, .inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 9px;
}

.left {
    float: left;
}

.right {
    float: right;
}

.center {
    width: 100%;
}

.inner {
    padding: 4px;
}

@media (min-width: 1024.0001px) {
    .none, .left, .right, .center .inner {
        width: 20%;
    }
}

@media (min-width: 768.0001px) and (max-width: 1024px) {
    .none, .left, .right, .center .inner {
        width: 25%;
    }
}

@media (min-width: 480.0001px) and (max-width: 768px) {
    .none, .left, .right, .center .inner {
        width: 33%;
    }
}

@media (max-width: 480px) {
    .outer {
        width: 100%;
    }

    .inner{
        width: 50%;
    }

    .none {
        width: 50%;
    }

    .right,
    .left {
        float: none;
    }
}
</style>
