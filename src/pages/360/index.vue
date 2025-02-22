<page>
title: &lt;360 Awareness
</page>

<script setup lang="ts">
const postsUnfiltered = useDocuments('~/pages/360/2023/');
const posts = postsUnfiltered.value.filter((post) => !post.frontmatter.hidden);
</script>

<template>
    <h2>2023 <span class="red">&lt;3</span>60 Awareness Project</h2>
    {{x}}

    <MeritBadgeList><ScaledContent><img src="/360/360-awareness-project-logo.png" class="wide" /></ScaledContent></MeritBadgeList>

    <p>In November 2022, shortly after Thanksgiving, I (Scoutmaster Bucky) was initially diagnosed with Stage 4 Prostate Cancer.  Over these initial 4 months, navigating the unknown, discovering good and bad, grasping mortality and faith, traversing the highs and lows, and redefining life ambitions and goals, I present the <b><span class="red">&lt;3</span>60 Awareness Project</b>.</p>

    <p>This initiative is to get people talking... to help bring awareness to causes, issues, and organizations; to help broaden your own self and social awareness.</p>

    <p><b><i><span class="red">&lt;3</span>60 Awareness Project*** - 60 days, 60 topics, 60 seconds.</i></b></p>

    <p><b><i><span class="red">#360Bucky</span></i></b></p>

    <TileWrapper>
        <Tile v-for="post in posts">
            <a :href="post.href" class="tile">
                <img v-if="post.frontmatter.logo" :src="`/360/${post.frontmatter.logo}`" class="tile-image"/>
                <img v-else src="/360/360-awareness-project-logo.png" class="tile-image" />
                <div>{{post.frontmatter.eventDate}}</div>
                <div>{{post.frontmatter.presenter}}</div>
                <div>{{post.frontmatter.title}}</div>
                <div>{{post.frontmatter.summary}}</div>
            </a>
        </Tile>
    </TileWrapper>
</template>

<style scoped>
.red {
    color: red;
}

.tile {
    display: flex;
    flex-direction: column;
    text-decoration: none;
    width: 100%;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 12px;
}

.tile-image {
    max-width: 50%;
}
</style>
