<template>
    <div class="banner-line unprintable">
        <MenuButton
            href="/merit-badges/"
            title="Merit Badges"
            src="/images/merit-badges-icon.png"
        />
        <MenuButton
            href="/test-lab/"
            title="Test Lab"
            src="/images/test-lab-icon.webp"
        />
        <MenuButton
            href="/scout-ranks/"
            title="Scout Ranks"
            src="/images/ranks-icon.png"
        />
        <MenuButton
            href="/other-awards/"
            title="Other Awards"
            src="/images/other-awards-icon.png"
        />
    </div>
    <div class="banner-line-divider unprintable"></div>
</template>

<style scoped>
.banner-line {
    background: var(--banner-menu-background);
    border-top: var(--banner-menu-border);
    border-bottom: var(--banner-menu-border);
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

@media (max-width: 480px) {
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
