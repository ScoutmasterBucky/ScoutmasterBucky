<page>
title: Scoutmaster Bucky
#news:
#    - The Duluth event is now LIVE!
#    - Merit badges have been updated to 2025 requirements.
</page>

<template>
    <div class="showcase">
        <div class="centered-box">
            <div class="headline">Welcome from Scoutmaster Bucky</div>
            <div class="gap-after">Serving Scouts since January 2009</div>
            <div>Remember the Scout Motto:</div>
            <div class="emphasis">Be Prepared</div>
            <div>At Scoutmaster Bucky events this is not a request, wish, or desire…</div>
            <div class="emphasis">it is an expectation.</div>
        </div>

        <!-- Spot here for a featured item to display on the right -->
        <FeaturedItemYoutubeVideo />
    </div>

    <SmbNews v-if="$frontmatter.news" :news="$frontmatter.news" />
    <TestLab />

    <h2>Upcoming Events</h2>
</template>

<style scoped>
.showcase {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding: 1em 1em;
}

@media (max-width: 768px) {
    .showcase {
        flex-direction: column;
        gap: 1.5em;
    }
}

.centered-box {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.headline {
    color: var(--smb-text-color);
    font-weight: bold;
    font-size: 2em;
}

.gap-after {
    padding-bottom: 1em;
}

.emphasis {
    font-weight: bold;
    font-size: 1.3em;
    color: var(--smb-text-color);
}
</style>
