<template>
    <div class="banner-line unprintable">
        <MenuButton
            href="/"
            title="Scoutmaster Bucky"
            src="/images/smb-small.png"
            subtitle="an area for Scouts BSA"
        />
        <MenuButton
            href="/nova-lab/"
            title="Nova Lab"
            src="/nova-lab/nova.svg"
            subtitle="fun science awards"
        />
    </div>
    <div class="banner-line-divider unprintable"></div>
</template>

<style scoped>
.banner-line {
    background: var(--banner-menu-background);
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
