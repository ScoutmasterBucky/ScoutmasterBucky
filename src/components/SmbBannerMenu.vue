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
    <div class="banner-line-divider">
    </div>
</template>

<style scoped>
.banner-line {
    background: var(--heading-1-background);
    display: flex;
    gap: 10px;
    justify-content: space-evenly;
    padding: 0.4em 10px;
    align-items: center;
}

@media (max-width: 768px) {
    .banner-line {
        font-size: 0.9em;
    }
}

@media (max-width: 480px), print {
    .banner-line {
        display: none;
    }
}

.banner-line-divider {
    display: none;
}

@media screen and (max-width: 480px) {
    .banner-line-divider {
        border-bottom: var(--menu-button-border);
        display: block;
        height: 4px;
        background: var(--heading-1-background);
    }
}
</style>
