<page>
title: Scout Ranks
badgesInOrder:
    - scout
    - tenderfoot
    - second-class
    - first-class
    - star
    - life
    - eagle
additionalPages:
    - eagle-palms
    - alternate-requirements
</page>

<script setup lang="ts">
import scoutRanks from '~/data/scout-ranks.json';
import updated from '~/data/updated.json';

const ranks = Object.keys(scoutRanks).filter(rank => scoutRanks[rank].rank);
const additional = Object.keys(scoutRanks).filter(
    rank => !scoutRanks[rank].rank
);
const updatedDate = new Date(updated['scout-ranks'].scout);
const updatedDateStr = updatedDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
});
</script>

<template>
    <ScaledContent align="center">
        <img src="/scout-ranks/scout-ranks.jpg" alt="Scout Ranks" class="wide" />
    </ScaledContent>

    <p>
        The rank requirements shown here are verified and are official as of
        {{ updatedDateStr }}. If a Scout has started work toward a rank before
        this date using requirements that were current before January 1, 2024,
        except as noted, they may complete that rank using the old requirements.
        Any progress toward a rank that starts after January 1, 2024, must use
        the requirements as they are shown on the respective rank pages here.
    </p>
    <p>
        The following are the ranks of Scouting. Click on the respective rank or
        rank insignia for the requirements a Scouts BSA member must achieve to
        attain the respective rank. While it is recommended and encouraged that
        Scouts complete their Scout rank exclusively, the requirements for
        Scout, Tenderfoot, Second Class, and First Class ranks may be worked on
        simultaneously; however these ranks must be earned in sequence.
    </p>

    <h2>List of Scout Ranks</h2>

    <MeritBadgeList>
        <ScoutRank v-for="rank in ranks" :rank="rank" />
    </MeritBadgeList>

    <h2>Additional Awards and Information</h2>

    <MeritBadgeList>
        <ScoutRank v-for="rank in additional" :rank="rank" />
    </MeritBadgeList>
</template>
