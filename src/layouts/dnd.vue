<template>
    <Head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
        />
        <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
        />
        <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <title>{{ $frontmatter.title }}</title>
    </Head>

    <div class="page-container theme-dnd">
        <header class="center column">
            <a href="/dnd/" class="center">
                <img src="/dnd/bucky-guild.png" class="logo unprintable" />
            </a>
            <div class="main-heading">Dungeons &amp; Dragons</div>
            <div class="sub-heading">
                Hosted by <a href="/">Scoutmaster Bucky</a>
            </div>
        </header>
        <main>
            <slot />
        </main>
        <footer class="center">
            Dungeons &amp; Dragons is a registered trademark of Wizards of the
            Coast, LLC.
        </footer>
    </div>
</template>

<style>
@import '~/assets/theme-smb.css';
@import '~/assets/theme-dnd.css';
@import '~/assets/base.css';
</style>

<style scoped>
.page-container {
    max-width: 1002px;
    margin: 0 auto;
    background: var(--page-background);
}

@media print {
    .page-container {
        max-width: initial;
        background: none;
    }
}

main {
    padding: 1.5em 0.5em 0.5em 0.5em;
}

.logo {
    width: auto;
    height: 10em;
    display: block;
}

.main-heading {
    display: flex;
    background: var(--banner-background);
    justify-content: space-evenly;
    flex-wrap: wrap;
    color: var(--banner-text-color);
    font-size: 5em;
    border-radius: 0.2em;
    padding: 0.3em;
    font-weight: bold;
}

@media (min-width: 768.0001px) and (max-width: 1024px) {
    .main-heading {
        font-size: 4em;
    }
}

@media (min-width: 480.0001px) and (max-width: 768px) {
    .main-heading {
        font-size: 2.6em;
    }
}

@media (max-width: 480px) {
    .main-heading {
        font-size: 2em;
    }
}

.sub-heading {
    font-size: 1.6em;
}

footer {
    color: var(--footer-text-color);
}
</style>
