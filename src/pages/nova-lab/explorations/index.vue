<page>
title: Venturing and Sea Scouts Explorations
layout: nova
</page>

<script setup lang="ts">
import requirements from '~/data/nova-lab/exploration-requirements.yaml';
</script>

<template>
    <p>
        Sea Scouts and Venturers need to complete explorations into STEM fields
        to complete <a href="../supernova/">Supernova awards</a>. These are
        similar to how Scouts BSA members need to complete
        <a href="/merit-badges/">merit badges</a>.
    </p>

    <p>
        The following requirements apply to any specific STEM field of interest
        chosen by a Venturer or Sea Scout while completing a Nova or Supernova
        award. Scouts BSA Merit Badge content is encouraged.
    </p>

    <h3>Exploration Topics</h3>

    <p>
        These STEM exploration topics are approved for earning the Venturing
        &amp; Sea Scout Supernova awards:
    </p>

    <p>
        Animal Science, Archaeology, Architecture, Astronomy, Automotive
        Maintenance, Aviation, Bird Study, Chemistry, Composite Materials,
        Computers, Dentistry, Drafting, Electricity, Electronics, Energy,
        Engineering, Environmental Science, Farm Mechanics, Fish and Wildlife
        Management, Forestry, Gardening, Geocaching, Geology, Insect Study,
        Inventing, Mammal Study, Medicine, Nature, Nuclear Science,
        Oceanography, Plant Science, Pulp and Paper, Radio, Reptile and
        Amphibian Study, Robotics, Scuba Diving, Soil and Water Conservation,
        Space Exploration, Surveying, Veterinary Medicine, Weather, Welding.
    </p>

    <h2>Exploration Requirements</h2>

    <Requirements :requirements="requirements" />
</template>
