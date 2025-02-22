<page>
title: Scuba BSA
</page>

<script setup lang="ts">
import requirements from '~/data/other-awards/scuba-bsa.yaml';
</script>

<template>
    <ScaledContent align="center">
        <OtherAwardBucky award="scuba-bsa" />
    </ScaledContent>

    <h3>Scuba BSA</h3>

    <p>
        All aspects of the Scuba BSA program must conform with the BSA scuba
        policy found in the Guide to Safe Scouting. Instructors not familiar
        with the Scouting program should consult the BSA manual,
        <a href="../aquatics-guide.pdf"
            >Aquatics Supervision: A Leader’s Guide to Youth Swimming and
            Boating Activities, No. 34346</a
        >, which also contains the BSA scuba policy.
    </p>

    <p>
        Counselors for Scuba BSA must hold current scuba instructor
        certification from PADI, NAUI, SSI, or RSTC member organizations.
        Instruction must comply with RSTC standards for introductory scuba
        experiences. Minimum standards include instructor-to-participant ratios.
        In a pool, the maximum ratio is eight participants per instructor. In a
        confined waterfront setting, the maximum ratio is four participants per
        instructor. Ratios may be increased by two participants if the
        instructor is assisted by someone certified as a divemaster or assistant
        instructor.
    </p>

    <p>
        A second adult who understands the procedures should be present in case
        the instructor becomes incapacitated. Two-deep adult leadership is also
        required by BSA Youth Protection guidelines.
    </p>

    <p>
        Before participants are allowed in the water, they must complete an
        Annual Health and Medical Record designed for scuba activities.
        Instructors should use standard forms advocated by their certifying
        agency.
    </p>

    <p>
        Instructors may use agency materials, such as participant guidebooks,
        slide shows, and videos to help convey cognitive material. Skill
        instruction must be conducted in clear, confined water. A swimming pool
        is recommended.
    </p>

    <p>
        Scuba BSA is ideally suited to winter programs using indoor pools. Two
        45-minute sessions are appropriate for instruction, practice, and
        completion of requirements.
    </p>

    <p>
        Although Scuba BSA is similar to introductory scuba experiences offered
        by various RSTC member organizations and other dive agencies, those
        programs are not substitutes for Scuba BSA. All requirements must be
        completed as stated on the application form. The counselor may not omit,
        vary, or add requirements. In particular, Scuba BSA has a prerequisite
        swimming requirement, is only available to youth and adults registered
        in the Boy Scout, Venturing, or Sea Scout programs (minimum age around
        10½), and does not include the option of an open-water dive.
    </p>

    <p>
        Local council programs may not compress or sell air for scuba use, or
        sell, rent, or loan scuba equipment. All air and equipment for local
        council Scuba BSA programs must be obtained from properly licensed
        sources, not affiliated with the Boy Scouts of America and under the
        supervision of PADI, NAUI, SSI, or RSTC-approved and certified scuba
        instructors.
    </p>

    <p>
        Individuals completing the Scuba BSA requirements qualify for a
        recognition card and patch. The completed award application should be
        handled as directed by the council Training, Aquatics, or other
        committee.
    </p>

    <p>
        <i
            >The counselor must hold an instructor rating with current teaching
            status with PADI, NAUI, SSI, or RSTC member organization in
            accordance with BSA scuba policies in the Guide to Safe Scouting.
            Counselors must have council approval.</i
        >
    </p>

    <p>
        <i
            >Swimsuit / swim trunks emblem - The Scuba BSA patch is NOT worn on
            the uniform or the sash; it is worn on the left side of the swimsuit
            / swim trunks.</i
        >
    </p>

    <p>
        Upon successful completion, participants earn the Scuba BSA patch along
        with their achievement card. Completion indicates the individual has
        experienced a valuable introduction to scuba.
    </p>

    <p>
        For more information and the award application, read
        <a href="../aquatics-guide.pdf">Aquatics Supervision - Leader's Guide</a
        >. The award application is contained in the appendix.
    </p>

    <div class="gallery">
        <img src="/other-awards/scuba-bsa-card-front.jpg" />
    </div>

    <h2>Scuba BSA Requirements</h2>

    <Requirements :requirements="requirements" />
</template>

<style scoped>
.gallery {
    display: flex;
    justify-content: center;
}
</style>
