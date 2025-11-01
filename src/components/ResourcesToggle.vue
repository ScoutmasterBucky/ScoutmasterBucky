<script setup lang="ts">
import { useTemplateRef } from 'vue';

const ref = useTemplateRef('toggle');

const toggleCheckbox = () => {
    ref.checked = !ref.checked;
};

const update = () => {
    const showResources = !!ref.checked;
    for (const element of document.getElementsByClassName('resource-toggle')) {
        element.classList.toggle('hidden');
    }
};
</script>

<template>
    <div class="centered-line">
        <label class="toggle-switch" @change.stop.prevent="update">
            <input type="checkbox" class="toggle-input" ref="toggle" />
            <span class="slider round"></span>
        </label>
        <span class="left-gap">Show additional resources</span>
    </div>
</template>

<style scoped>
.centered-line {
    display: flex;
    align-items: center;
}

.left-gap {
    margin-left: 8px;
}

/* Hide the default checkbox */
.toggle-input {
    display: none;
}

/* Style the switch track */
.toggle-switch {
    position: relative;
    display: inline-block;
    width: 40px;
    height: 22px;
    background-color: #ccc;
    border-radius: 22px;
    cursor: pointer;
    transition: background-color 0.4s;
}

/* Style the slider/knob */
.slider {
    position: absolute;
    content: '';
    height: 16px;
    width: 16px;
    left: 1px;
    bottom: 3px;
    background-color: white;
    border-radius: 50%;
    transition: transform 0.4s;
}

/* Styles when checked */
.toggle-input:checked + .slider {
    transform: translateX(18px);
}

.toggle-switch:has(.toggle-input:checked) {
    background-color: green;
}
</style>
