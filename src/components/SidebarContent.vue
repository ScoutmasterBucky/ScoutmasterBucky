<template>
    <div class="wrapper">
        <slot></slot>
    </div>
</template>

<style scoped>
.wrapper {
    display: flex;
    align-items: center;
    flex-direction: column;
    max-width: 25%;
}

@media (min-width: 768.0001px) and (max-width: 1002px) {
    .wrapper {
        max-width: 30%;
    }
}

@media (max-width: 768px) {
    .wrapper {
        max-width: 100%;
    }
}
</style>
