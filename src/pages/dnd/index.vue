<page>
title: Dungeons &amp; Dragons
layout: dnd
</page>

<script setup lang="ts">
import CarouselSetup from '~/logic/dnd/carousel.ts';
</script>

<template>
    <div class="kalam intro">
        <CarouselSetup client:load />

        <p>Greetings, brave souls! The kingdom is in dire need of your assistance. Monstrous creatures have emerged from the surrounding forests, threatening the safety and prosperity of our people. We implore you, four valiant adventurers, to join forces and embark on a perilous journey to save our land.</p>

        <p>Your efforts shall not go unrewarded. We shall grant you an audience with our gracious king and queen, who will bestow upon you riches and honors befitting your heroism.</p>

        <p>Your adventure shall begin with a multitude of games and festivities. After partaking in a provided lunch, you will set off and the fate of our kingdom will rest in your hands. May the gods guide and protect you on your journey.</p>
    </div>

    <h2>About the Event</h2>

    <p>Scoutmaster Bucky is hosting a Dungeons &amp; Dragons full-day event at Phillippo Scout Camp. Join us for a morning filled with outdoor challenges and an afternoon of role playing. Bring your non-Scouting friends and family as well!</p>

    <h3>Schedule</h3>

    <ul>
        <li>7:00 am - Registration opens. There will be lines, so <u>please arrive early</u>.</li>
        <li>7:55 am - <b>Registration closes!</b></li>
        <li>8:00 am - Event starts.</li>
        <li>9:00 am - Outdoor challenges test your team's six key abilities.</li>
        <li>Noon - Lunch served with the King and Queen.</li>
        <li>1:00 pm - Cleanup, preparation, and instruction for afternoon.</li>
        <li>1:30 pm - Tables are set up, introductions are made.</li>
        <li>2:00 pm - Adventurers play Dungeons & Dragons with their table.</li>
        <li>6:00 pm - Event closes.</li>
    </ul>

    <h3>Registration</h3>

    <p>Registration is done by table, meaning that participants will sign up for a specific class at a specific table. Each table will hold up to four players and there will not be duplicates of any class. Encourage your friends to join your table and help ensure a fun time and a successful quest.</p>

    <div class="register kalam">
        <a href="https://scoutmasterbucky.regfox.com/2024-dungeons-dragons-honour-among-scouts">Register Here</a>
    </div>

    <h2>Learn More</h2>

    <dl>
        <dt><b>Do I need to know how to play Dungeons &amp; Dragons?</b></dt>
        <dd>Absolutely not! We welcome all skill levels, including people who have never played and are interested to try it out for the first time.</dd>

        <dt><b>Is this overnight?</b></dt>
        <dd>The event only lasts for the day, but you are welcome to reserve a campsite at Phillippo for the weekend.</dd>

        <dt><b>What meals are provided?</b></dt>
        <dd>Lunch is included, and it is a feast!</dd>

        <dt><b>Can I help? Can I DM?</b></dt>
        <dd>We need experienced Dungeon Masters to help make this event successful. You will be to staff stations in the morning and preside over a table in the afternoon. In addition, there will be an instruction weekend to help get everyone on the same page and run through the adventure before we open it up to Scouts. Please contact Scoutmaster Bucky at <a href="mailto:ScoutmasterBucky@yahoo.com?subject=Dungeon Master Intereset">ScoutmasterBucky@yahoo.com</a>.</dd>
    </dl>
</template>

<style scoped>
.intro {
    font-size: 1.8em;
}

@media (min-width: 768.0001px) and (max-width: 1024px) {
    .intro {
        font-size: 1.6em;
    }
}

@media (min-width: 480.0001px) and (max-width: 768px) {
    .intro {
        font-size: 1.4em;
    }
}

@media (max-width: 480px) {
    .intro {
        font-size: 1.2em;
    }
}

.register {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.8em;
}

dd {
    margin-left: 1em;
}
</style>
