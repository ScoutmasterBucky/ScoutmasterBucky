<script setup lang="ts">
const year = new Date().getFullYear();
</script>

<template>
    <footer class="unprintable">
        <div class="saying">Developing today's youth to become tomorrow's leaders</div>
        <div class="bar">© {{year}} Brian Reiners (Scoutmaster Bucky) &middot; All Rights Reserved</div>
    </footer>
</template>

<style scoped>
.saying {
    padding: 0.5em;
    text-align: center;
    font-size: 2em;
    font-weight: bold;
    color: var(--footer-saying-color);
}

@media (min-width: 768.0001px) and (max-width: 1024px) {
    .saying {
        font-size: 1.5em;
    }
}

@media (max-width: 768px) {
    .saying {
        font-size: 1em;
    }
}

.bar {
    text-align: center;
    font-size: 0.8em;
    color: var(--footer-bar-color);
    border-top: var(--footer-bar-border);
    border-bottom: var(--footer-bar-border);
    background: var(--footer-bar-background);
    padding: 6px 10px;
    text-transform: uppercase;
}
</style>
