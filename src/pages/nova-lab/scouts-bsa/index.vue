<page>
title: Scouts BSA Nova Awards
layout: nova
program: scouts-bsa
</page>

<script setup lang="ts">
import meritBadges from '~/data/merit-badges.json';
const badgesWithNovas = Object.entries(meritBadges)
    .map(([name, info]) => ({ ...info, name }))
    .filter(badge => badge.novas.length > 0);
</script>

<template>
    <p>
        Nova awards use a slightly more scientific approach while exposing
        Scouts to new material. These awards cover the four main STEM areas,
        Science, Technology, Engineering, and Mathematics. Scouts will learn a
        lot and should have a lot of fun while earning these awards.
    </p>

    <h3>Science</h3>

    <NovaCategory :program="$frontmatter.program" topic="science" />

    <h3>Technology</h3>

    <NovaCategory :program="$frontmatter.program" topic="technology" />

    <h3>Engineering</h3>

    <NovaCategory :program="$frontmatter.program" topic="engineering" />

    <h3>Math</h3>

    <NovaCategory :program="$frontmatter.program" topic="math" />

    <h2>Earning Nova Awards</h2>

    <MeritBadgeList>
        <ScaledContent>
            <img src="/nova-lab/scouts-bsa-nova-patch.webp" class="wide" />
        </ScaledContent>
        <ScaledContent>
            <img src="/nova-lab/nova-pi-device.webp" class="wide" />
        </ScaledContent>
    </MeritBadgeList>

    <p>
        A registered Nova counselor needs to work with the Scout to ensure all
        requirements are met. Once earned, the Nova counselor will record the
        advancement using
        <a href="/nova-lab/34403.pdf">Advancement Report, form 34403</a>, which
        can be given to the Scout. This form should be provided to the troop's
        advancement chair to be recorded.
    </p>

    <p>
        If this is the Scout's first Nova award in any program, they should be
        awarded with the Scouts BSA Nova patch, which has a red border as shown
        above. Subsequent Nova awards are recognized with a Pi device (the pin),
        which should be pinned to a point on the patch. This means if a Scout
        has earned the Nova patch in any other program, continue to use that
        patch and keep adding Pi devices.
    </p>

    <h2>Supernova Awards</h2>

    <p>
        Ready to take your STEM adventures to the next level? Want to wear a
        medal to your formal events? Then the Supernova awards are for you!
        These awards are designed to be more challenging and more rewarding than
        the Nova awards. The medals that are awarded are rarely seen and are
        amazing to wear.
    </p>

    <p>
        Learn more about the <a href="../supernova/">Supernova awards</a> and the
        award progression.
    </p>

    <MeritBadgeList>
        <SupernovaAward supernova="dr-bernard-harris" />
        <SupernovaAward supernova="thomas-alva-edison" />
        <SupernovaAward supernova="dr-albert-einstein" />
    </MeritBadgeList>

    <h2>Nova Awards by Merit Badge</h2>

    <p>
        Nova awards require the completion of a merit badge. So, if there's a
        Scout that's working on one of the following merit badges, then they
        already have a head start on earning a related Nova award! However, keep
        track of which merit badges are used for each Nova award because they
        can't be used for more than one.
    </p>

    <p>
        The following merit badges are used for the Nova awards. On the merit
        badge's page is a list of related awards that involve the merit badge.
    </p>

    <MeritBadgeList>
        <MeritBadge v-for="badge in badgesWithNovas" :badge="badge.name" />
    </MeritBadgeList>
</template>
