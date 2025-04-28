<script setup lang="ts">
const toggle = () => {
    document.getElementById('menu').classList.toggle('flyout');
};
</script>

<template>
    <div id="menu" class="unprintable">
        <a
            class="toggle"
            @click.stop.prevent="toggle()"
            href="#"
        >
            <svg
                viewBox="0 0 100 100"
                width="40"
                height="40"
                class="Fill(--buttonBackground)"
            >
                <rect x="5" y="14" width="90" height="16" rx="10"></rect>
                <rect x="5" y="42" width="90" height="16" rx="10"></rect>
                <rect x="5" y="70" width="90" height="16" rx="10"></rect>
            </svg>
        </a>
        <MenuButton
            href="/"
            title="Scoutmaster Bucky"
            src="/images/smb-small.png"
            subtitle="an area for Scouts BSA"
        />

        <div class="featured">
            <MenuButton
                href="/merit-badges/"
                title="Merit Badges"
                src="/images/merit-badges-icon.png"
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

        <MenuButton
            href="/nova-lab/"
            title="Nova Lab"
            src="/nova-lab/nova.svg"
            subtitle="fun science awards"
        />
    </div>
</template>

<style scoped>
#menu {
    background: var(--flyout-menu-background);
    color: var(--flyout-menu-text-color);
    display: none;
    left: calc(-100% + 60px);
    padding: 8px;
    position: fixed;
    top: 0;
    transition: left 0.5s;
    transition-timing-function: ease-in-out;
    width: calc(100% - 60px);
    border-right: var(--flyout-menu-border);
    border-bottom: var(--flyout-menu-border);
}

#menu.flyout {
    left: 0;
}

@media screen and (max-width: 480px) {
    #menu {
        display: block;
    }
}

.toggle {
    position: absolute;
    top: 0;
    left: 100%;
    display: block;
    background: var(--flyout-menu-background);
    padding: 8px;
    border-right: var(--flyout-menu-border);
    border-bottom: var(--flyout-menu-border);
}

svg {
    fill: var(--flyout-menu-icon-color);
}

.featured {
    padding-left: 1em;
}
</style>
