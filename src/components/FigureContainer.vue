<script setup lang="ts">
const { align = 'right', position = 'bottom' } = defineProps<{
    align?: String;
    position?: String;
}>();
const classList = `wrapper ${align} ${position}`;
</script>

<template>
    <div :class="classList">
        <div class="figure">
            <slot name="figure" />
        </div>
        <div><slot /></div>
    </div>
</template>

<style scoped>
.wrapper {
    display: flex;
    align-items: center;
}

.left {
    flex-direction: row;
}

.right {
    flex-direction: row-reverse;
}

@media (max-width: 480.0001px) {
    .top {
        flex-direction: column;
    }

    .bottom {
        flex-direction: column-reverse;
    }
}

.figure {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    width: 20%;
    padding: 0.4em 0.8em;
    align-items: center;
}

@media (min-width: 768.0001px) and (max-width: 1024px) {
    .figure {
        width: 25%;
    }
}

@media (min-width: 480.0001px) and (max-width: 768px) {
    .figure {
        width: 33%;
    }
}

@media (max-width: 480.0001px) {
    .figure {
        width: 50%;
    }
}
</style>
