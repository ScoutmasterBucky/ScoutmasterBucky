<page>
title: "Deconstruct and Analyze: Mechanical Designs"
layout: nova
</page>

<script setup lang="ts">
import requirementsPart1 from '~/data/nova-lab/activity-topics/mechanical-designs-part-1.yaml';
import requirementsPart2a from '~/data/nova-lab/activity-topics/mechanical-designs-part-2a.yaml';
import requirementsPart2b from '~/data/nova-lab/activity-topics/mechanical-designs-part-2b.yaml';
</script>

<template>
    <ActivityTopicPreamble />

    <h2>Deconstruct and Analyze: Mechanical Designs</h2>

    <p>
        This activity can be done individually or in a small group. Your task is
        to take apart a bicycle (or other suitably complex mechanical device;
        see the note below), analyze the components, and describe how the
        components work (both separately and together).
    </p>

    <h3>Part 1: Preplanning and Set-Up</h3>

    <Requirements :requirements="requirementsPart1" />

    <h3>Part 2: Deconstruction, Analysis, and Report</h3>

    <p>
        This next phase involves deconstructing the device. Take pictures as you
        work, and make notes of what is happening in each picture.
    </p>

    <Requirements :requirements="requirementsPart2a" />

    <p>
        It is not crucial for the object you deconstruct to be a bicycle. Any
        mechanical device, machine, or tool will do, as long as it is suitably
        complex for your abilities and knowledge and is approved by your mentor.
        Examples include but are not limited to manual typewriters, old clocks,
        old sewing machines, and so on.
    </p>

    <p>
        If you wish to deconstruct something that is electronic in nature
        (rather than just mechanical), then you will need to learn about
        additional safety protocols that must be observed while deconstructing
        electronics. Your mentor may suggest and help to secure the help of a
        qualified electronics expert for those projects. You must demonstrate to
        your mentor that you know and understand these additional safety
        protocols prior to beginning your deconstruction.
    </p>

    <p>
        Whatever you choose to deconstruct, you must adapt the questions above
        to suit the object you are deconstructing and address those questions in
        your report.
    </p>

    <Requirements :requirements="requirementsPart2b" />

    <h3>Resources</h3>

    <p>
        Bryan Bergeron. Teardowns: Learn How Electronics Work by Taking Them
        Apart. McGraw-Hill/TAB Electronics, 2010.
    </p>

    <p>
        Naval Education and Training Program. Basic Machines and How They Work.
        Dover Publications, 1997.
    </p>
</template>
