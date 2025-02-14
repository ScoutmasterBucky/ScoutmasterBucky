<template>
    <div class="modal-wrapper" @key.esc="$emit('close')" @click="$emit('close')">
        <div class="modal-content">
            <div class="modal-close" @click="$emit('close')">
               ✕
            </div>
            <slot />
        </div>
    </div>
</template>

<style scoped>
.modal-wrapper {
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 20px;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background: var(--page-background);
    padding: 20px;
    border-radius: 0.8em;
    position: relative;
    border: var(--modal-border);
    max-width: 100%;
}

.modal-close {
    position: absolute;
    top: -20px;
    right: -20px;
    cursor: pointer;
    border: var(--modal-close-border);
    background: var(--modal-close-background);
    border-radius: 0.5em;
    color: var(--modal-close-color);
    font-size: 1.6em;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
