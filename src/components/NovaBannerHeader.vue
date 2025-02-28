<template>
    <a href="/nova-lab/" class="banner unprintable">
        <img src="/nova-lab/nova-header.jpg" class="wide" />
        <div class="title-position offside">
            <div class="title-wrapper">
                <div>Scoutmaster Bucky's</div>
                <div class="title">Nova Lab</div>
            </div>
        </div>
    </a>
</template>

<style scoped>
.banner {
    display: block;
    text-decoration: none;
}

.title-position {
    position: absolute;
    top: 0;
    justify-content: center;
    align-items: center;
    width: 60%;
    height: 100%;
    display: flex;
    color: var(--heading-1-text-color);
    font-size: 2em;
}

@media (min-width: 768.0001px) and (max-width: 1024px) {
    .title-position {
        font-size: 1.6em;
    }
}

@media (min-width: 480.0001px) and (max-width: 768px) {
    .title-position {
        font-size: 1.1em;
    }
}

@media (max-width: 480px) {
    .title-position {
        font-size: 0.8em;
    }
}

.title-wrapper {
    background: var(--banner-background);
    border-radius: 2em;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1em;
}

.title {
    font-size: 3em;
    font-weight: bold;
}
</style>
