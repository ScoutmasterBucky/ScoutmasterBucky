<page>
title: "Build and Test: High Performance Paper Gliders"
layout: nova
</page>

<script setup lang="ts">
import requirementsPart1 from '../../../../../data/nova-lab/activity-topics/paper-gliders-part-1.yaml';
import requirementsPart2 from '../../../../../data/nova-lab/activity-topics/paper-gliders-part-2.yaml';
</script>

<template>
    <ActivityTopicPreamble />

    <h2>Build and Test: High Performance Paper Gliders</h2>

    <p>
        This activity can be done individually, but works much better with at
        least two people. Your task is to measure how differences in design
        affect the flight characteristics of a glider. You will accomplish this
        by building and testing some high-performance paper gliders. These
        gliders use a laminated construction method that helps simulate a real
        glider much more closely than a simple folded piece of paper.
    </p>

    <h3>Part 1: Background Research, Baseline Design Selection, and Test</h3>

    <Requirements :requirements="requirementsPart1" />

    <h3>Part 2: Analyze and Report</h3>

    <p>
        Present to your mentor your recorded data in a tabular format as well as
        a graphical format. (You may use Excel if you wish.) Then do the
        following:
    </p>

    <Requirements :requirements="requirementsPart2" />

    <p>
        Source: The idea for this activity is based on the work of Andrew Olson,
        Ph.D., Science Buddies, What Makes a Good Aerodynamic Design? Test Your
        Ideas with High-Performance Paper Gliders. Visit
        <a
            href="http://www.sciencebuddies.org/science-fair-projects/project_ideas/Aero_p009.shtml"
            >www.sciencebuddies.org/science-fair-projects/project_ideas/Aero_p009.shtml</a
        >.
    </p>

    <h3>Resources</h3>

    <p>
        Science 85 Magazine. The Paper Airplane Book: The Official Book of the
        Second Great International Paper Airplane Contest (best book for
        laminated paper techniques). Science 85 Magazine, 1985.
    </p>

    <p>
        Hubert Smith. The Illustrated Guide to Aerodynamics (for background
        research). McGraw-Hill Professional, 1991.
    </p>

    <p>
        NASA Beginner’s Guide to Aeronautics,
        <a href="https://www.grc.nasa.gov/WWW/K-12/airplane/guided.htm"
            >https://www.grc.nasa.gov/WWW/K-12/airplane/guided.htm</a
        >
        (For background research, look at the gliders section.)
    </p>

    <p>
        The Online Paper Airplane Museum,
        <a href="http://www.theonlinepaperairplanemuseum.com/"
            >http://www.theonlinepaperairplanemuseum.com/</a
        >
        (free glider plans)
    </p>
</template>
