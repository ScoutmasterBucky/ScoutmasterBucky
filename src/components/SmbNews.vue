<script setup lang="ts">
const { news } = defineProps<{ news: Object }>();
const newsArray = Array.isArray(news) ? news : [];
</script>

<template>
    <h2>News</h2>

    <div class="news-wrapper">
        <FigureContainer align="left" position="top">
            <template #figure>
                <img
                    src="/images/bucky-with-newspaper.jpg"
                    class="bucky-newspaper"
                />
            </template>

            <div
                class="news-item"
                v-for="item in $frontmatter.news"
                :key="item"
            >
                <div class="news-new">NEW!</div>
                <div>{{ item }}</div>
            </div>
        </FigureContainer>
    </div>
</template>

<style scoped>
.bucky-newspaper {
    width: 100%;
    height: auto;
}

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
