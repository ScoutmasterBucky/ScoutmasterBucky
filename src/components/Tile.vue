<template>
    <div class="size">
        <div class="box">
            <slot />
        </div>
    </div>
</template>

<style scoped>
.size {
    width: 33%;
    padding: 0.5em;
}

@media (min-width: 480.0001px) and (max-width: 768px) {
    .size {
        width: 50%;
    }
}

@media (max-width: 480px) {
    .size {
        width: 100%;
    }
}

.box {
    border: var(--tile-border);
    border-radius: 1em;
    transition: all 0.2s;
    user-select: none;
    height: 100%;
}

.box:hover {
    background: var(--tile-hover-background);
}
</style>
