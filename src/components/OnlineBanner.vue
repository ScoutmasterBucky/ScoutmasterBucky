<template>
        <div class="online-banner">ONLINE</div>
</template>

<style scoped>
.online-banner {
    position: absolute;
    top: -25px;
    left: -35px;
    transform-origin: bottom right;
    width: 140px;
    overflow: hidden;
    text-align: center;
    transform: rotate(-35deg);
    font-weight: bold;
    font-size: 0.8em;
    padding-top: 0.2em;
    background: var(--event-online-banner-background);
    border: var(--event-online-banner-border);
}
</style>
