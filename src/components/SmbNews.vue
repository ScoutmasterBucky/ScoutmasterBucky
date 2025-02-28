<script setup lang="ts">
const { news } = defineProps<{ news: Object }>();
const newsArray = Array.isArray(news) ? news : [];
</script>

<template>
    <h2>News</h2>

    <div class="news-wrapper">
        <ScaledContent float="left">
            <img src="/images/bucky-with-newspaper.jpg" class="wide" />
        </ScaledContent>

        <div class="news-item" v-for="item in $frontmatter.news" :key="item">
            <div class="news-new">NEW!</div>
            <div>{{ item }}</div>
        </div>
    </div>
</template>

<style scoped>
.news-wrapper {
    padding: 1em;
}

.news-item {
    display: flex;
}

.news-new {
    display: flex;
    color: var(--index-news-text-color);
    font-weight: bold;
    padding-right: 8px;
}
</style>
