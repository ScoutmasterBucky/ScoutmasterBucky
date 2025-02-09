<template>
    <div class="wrapper kalam">
        <a class="image-container" href="/dnd/"><img src="/dnd/bucky-guild.png" /></a>
        <div class="title">Dungeons &amp; Dragons</div>
        <p>Join Scoutmaster Bucky and his team of Dungeon Masters on October 5th.</p>
        <p><a href="/dnd/">Learn more!</a></p>
    </div>
</template>

<style scoped>
.wrapper {
    display: flex;
    align-items: center;
    flex-direction: column;
    max-width: 25%;
}

@media (min-width: 768.0001px) and (max-width: 1002px) {
    .wrapper {
        max-width: 30%;
    }
}

@media (max-width: 768px) {
    .wrapper {
        max-width: 100%;
    }
}

p {
    text-align: center;
}

.image-container {
    width: 80%;
    height: auto;
}

@media (min-width: 480.0001px) and (max-width: 768px) {
    .image-container {
        width: 35%;
    }
}

@media (max-width: 480px) {
    .image-container {
        width: 60%;
    }
}

.image-container img {
    width: 100%;
    height: auto;
    background: var(--dnd-background);
    border-radius: 1em;
}

.title {
    padding-top: 0.4em;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 1.2em;
}

</style>
