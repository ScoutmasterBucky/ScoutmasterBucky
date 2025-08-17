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

    <div class="page-container theme-smb">
        <header>
            <SmbHeaderBannerImage client:load />
            <SmbBannerMenu />
        </header>
        <main>
            <slot />
        </main>
        <SmbFooter />
    </div>
    <FlyoutMenu client:load />
</template>

<style>
@import '~/assets/theme-smb.css';
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
    }
}

main {
    padding: 0.5em;
}
</style>
