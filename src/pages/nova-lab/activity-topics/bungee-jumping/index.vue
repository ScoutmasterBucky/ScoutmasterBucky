<page>
title: "From Simulations to Real Life: Modeling Bungee Jumping"
layout: nova
</page>

<script setup lang="ts">
import requirementsPart2 from '~/data/nova-lab/activity-topics/bungee-jumping-part-2.yaml';
</script>

<template>
    <ActivityTopicPreamble />

    <h2>From Simulations to Real Life: Modeling Bungee Jumping</h2>

    <p>
        This activity requires at least two people and works much better with a
        group of three to six people.
    </p>

    <p>
        <b>The scenario:</b> The Acme Daredevil Adventure Company provides rock
        climbing, skydiving, extreme skiing, and cliff diving adventures to the
        public. To appeal to a broader market, the board decided to add bungee
        jumping to its list of offerings. The details of this new venture now
        need to be worked.
    </p>

    <p>
        The company has several sites planned for bungee jumping, and each site
        has a different jump height. Your task is to simulate bungee jumping
        using rubber bands and an action figure (doll) to determine the ultimate
        length, or the number of rubber bands to be used with your action figure
        at any given height to guarantee a safe jump. For maximum thrills, the
        jump must allow your action figure to come as close to the floor as
        possible.
    </p>

    <h3>Part 1: Set-Up and Simulation</h3>

    <p>
        Tape a weight(s) to the doll's back so that it is heavy enough to
        stretch the rubber band "bungee cord." Tie one or two rubber bands (the
        unstretched size should be about 4 inches) to the doll's feet and drop
        it, headfirst, from various heights. Keep raising the jump height until
        the head no longer hits the floor. Once you reach this height, perform
        three trials, measure the height of the drop each time, calculate the
        average, and calculate the maximum error between the average and the
        drop heights used to find that average. (Conduct a test drop several
        times to practice taking readings.)
    </p>

    <p>
        Continue adding rubber bands to see what the average drop height will be
        for different numbers of rubber bands. Do the experiment with at least
        six different numbers of rubber bands. Use a tabular chart to help you
        organize and record your ~/data. (You may use Excel or create your own
        tables.)
    </p>

    <p>
        Scatter plots use horizontal and vertical axes on a graph to plot ~/data
        points and show how much one variable (or measurable "value") is
        affected by another. Each variable can be represented on the scatter
        plot with a dot. Once the scatter plot has been filled in with a number
        of dots, you should be able to see how the variables are "scattered" to
        show a trend. To learn more about scatter plots, use your favorite
        search engine on the Internet (with your parent's or guardian's
        permission), or ask your mentor.
    </p>

    <h3>Part 2: Analysis and Report</h3>

    <Requirements :requirements="requirementsPart2" />

    <p>Share your report with your mentor.</p>

    <p>
        Source: The ideas for this activity are based on multiple versions of an
        activity available online titled Bungee Barbie and Kamikaze Ken. The
        originator of idea for this activity is unknown.
    </p>
</template>
