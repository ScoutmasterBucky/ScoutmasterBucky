<template>
    <footer class="unprintable">
        <img
            src="/nova-lab/nova-footer.jpg"
            alt="Science, Technology, Engineering, Math"
            class="wide"
        />
        <div class="text">Science, Technology, Engineering, Math</div>
    </footer>
</template>

<style scoped>
.text {
    position: absolute;
    top: 0;
    display: flex;
    width: 100%;
    height: 100%;
    color: var(--footer-text-color);
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: 2.3em;
}

@media (min-width: 768.0001px) and (max-width: 1024px) {
    .text {
        font-size: 2em;
    }
}

@media (min-width: 480.0001px) and (max-width: 768px) {
    .text {
        font-size: 1.5em;
    }
}

@media (max-width: 480px) {
    .text {
        font-size: 1em;
    }
}
</style>
