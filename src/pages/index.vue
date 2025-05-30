<page>
title: Scoutmaster Bucky
#news:
#    - The Duluth event is now LIVE!
#    - Merit badges have been updated to 2025 requirements.
</page>

<script setup lang="ts">
import { DateTime } from 'luxon';
const lastBuildTime = DateTime.now().setZone('America/Chicago').toFormat('LLL d, yyyy, h:mm:ss a');
</script>

<template>
    <div class="showcase">
        <div class="centered-box">
            <div class="text-centered headline">Welcome from Scoutmaster Bucky</div>
            <div class="text-centered gap-after">Serving Scouts since January 2009</div>
            <div class="text-centered">Remember the Scout Motto:</div>
            <div class="text-centered emphasis">Be Prepared</div>
            <div class="text-centered">At Scoutmaster Bucky events this is not a request, wish, or desire…</div>
            <div class="text-centered emphasis">it is an expectation.</div>
        </div>

        <!-- Spot here for a featured item to display on the right -->
        <FeaturedItemYoutubeVideo code="-_BdIfBZbHo" ratio="16 / 9" />
    </div>

    <SmbNews v-if="$frontmatter.news" :news="$frontmatter.news" />

    <UpcomingEvents client:load />

    <TestLab />

    <h2>Disclaimer</h2>

    <p>The Scoutmaster Bucky program is a volunteer run program managed and maintained entirely by Brian Reiners (Scoutmaster Bucky) in conjunction with the council of Northern Star Scouting and other Scouting volunteers. All content, scheduling, arrangements, and the like are managed by Scoutmaster Bucky. All proceeds collected go to cover program expenses and operating costs (including but not limited to building rentals, program materials, class materials, and technology support), with any profits (when and if there are any) put back into the Scouting program annually.
    </p>

    <h2>Policies &amp; Contact Information</h2>

    <ScaledContent align="right"><img src="/bucky-waving.jpg" alt="Scoutmaster Bucky waving" class="wide" /></ScaledContent>

    <p>Requests for refunds or cancellations will be honored up to a week prior to any Scoutmaster Bucky event.</p>

    <p>Due to the high demand, only one Eagle-required merit badge is allowed per Scout per opportunity.</p>

    <p>Scoutmaster Bucky is Brian Reiners and is registered in Northern Star Scouting of Scouting America.</p>

    <p>Contact number: 612-483-0665<br />
    Email: <a href="mailto:ScoutmasterBucky@yahoo.com?subject=Home Page Inquiry">ScoutmasterBucky@yahoo.com</a></p>

    <p>Learn more about being <a href="counselors/">a counselor on the Bucky team</a>.</p>

    <p>Last updated at {{ lastBuildTime }} (Bucky Time is Central Time).</p>
</template>

<style scoped>
.text-centered {
    text-align: center;
}

.showcase {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}

@media (max-width: 768px) {
    .showcase {
        flex-direction: column;
        gap: 1.5em;
    }
}

.centered-box {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.headline {
    color: var(--smb-text-color);
    font-weight: bold;
    font-size: 2em;
}

.gap-after {
    padding-bottom: 1em;
}

.emphasis {
    font-weight: bold;
    font-size: 1.3em;
    color: var(--smb-text-color);
}
</style>
