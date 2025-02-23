<script setup lang="ts">
const { parents, requirements } = defineProps<{
    parents?: Number;
    requirements: Object;
}>();
const parentCount = parents ?? 0;
</script>

<template>
    <div v-for="requirement of requirements">
        <div class="line">
            <div v-for="n of parentCount" class="indent h-gap"></div>
            <div v-if="requirement.requirement" class="requirement">
                <div class="number h-gap">{{ requirement.requirement }}.</div>
                <div class="text v-gap" v-html="requirement.text"></div>
            </div>
            <div
                v-if="requirement.detail"
                class="detail v-gap"
                v-html="requirement.text"
            ></div>
        </div>
        <Requirements
            v-if="requirement.children"
            :requirements="requirement.children"
            :parents="parentCount + 1"
        />
    </div>
</template>

<style scoped>
.line {
    display: flex;
}

.indent {
    flex-shrink: 0;
}

.requirement {
    display: flex;
    width: 100%;
}

.requirement .number {
    padding-right: 0.4em;
    flex-shrink: 0;
    text-align: end;
}

.requirement .text {
    width: 100%;
}

.detail {
    width: 100%;
}

.h-gap {
    width: 26px;
}

.v-gap {
    padding-bottom: 8px;
}
</style>
