<template>
    <div class="banner-line">
        <SmbBannerMenuButton href="/merit-badges/" title="Merit Badges" />
        <SmbBannerMenuButton href="/scout-ranks/" title="Scout Ranks" />
        <SmbBannerMenuButton href="/other-awards/" title="Other Awards" />
        <SmbBannerMenuButton
            href="/nova-lab/"
            title="Nova Lab"
            src="/nova-lab/images/nova.svg"
            subtitle="fun science awards"
        />
    </div>
</template>

<style scoped>
.banner-line {
    background: var(--heading-1-background);
    display: flex;
    gap: 10px;
    justify-content: space-evenly;
    padding: 0.4em 10px;
}

@media (max-width: 768px) {
    .banner-line {
        font-size: 0.9em;
    }
}

@media (max-width: 480px) or print {
    .banner-line {
        display: none;
    }
}
</style>
