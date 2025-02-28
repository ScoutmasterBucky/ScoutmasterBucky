<page>
title: Venturing and Sea Scouts Nova Awards
layout: nova
program: venturing-and-sea-scouts
</page>

<template>
    <p>
        Venturers and Sea Scouts are able to learn about STEM fields (Science,
        Technology, Engineering, and Math) and receive awards for performing
        experiments and reporting on what they've done. These awards are fun
        activities for your unit to perform together or as an independent
        weekend activity.
    </p>

    <p>
        These Nova awards closely mirror the ones for
        <a href="../scouts-bsa/">Scouts BSA</a>, but these will require
        <a href="../explorations/">STEM explorations</a> instead of merit
        badges.
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
            <img
                src="/nova-lab/venturing-and-sea-scouts-nova-patch.webp"
                class="wide"
            />
        </ScaledContent>
        <ScaledContent>
            <img src="/nova-lab/nova-pi-device.webp" class="wide" />
        </ScaledContent>
    </MeritBadgeList>

    <p>
        Completion of requirements needs to be confirmed by a registered Nova
        award counselor. When everything's been accomplished, the Nova counselor
        will use
        <a href="/nova-lab/34403.pdf">Advancement Report, form 34403</a> to
        record the advancement. This form should be given to the unit's
        advancement chair to be recorded.
    </p>

    <p>
        If this is the Scout's first Nova award in any program, they should be
        awarded with the Venturing / Sea Scouts Nova patch, which has a green
        border as shown above. Subsequent Nova awards are recognized with a Pi
        device (the pin), which should be pinned to a point on the patch. This
        means if a Scout has earned the Nova patch in any other program,
        continue to use that patch and keep adding Pi devices.
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
        <SupernovaAward supernova="dr-sally-ride" />
        <SupernovaAward supernova="wright-brothers" />
        <SupernovaAward supernova="dr-albert-einstein" />
    </MeritBadgeList>

    <h2>Related Explorations</h2>

    <p>
        Nova awards for Venturers and Sea Scouts require a
        <a href="../explorations/">STEM exploration</a>. If your activities
        already align with one of these topics, it would be an ideal time to
        also earn a Nova award.
    </p>

    <ul>
        <li>
            Additive Manufacturing -
            <NovaLink
                :program="$frontmatter.program"
                nova="something-from-nothing"
            />
        </li>
        <li>
            American Business -
            <NovaLink :program="$frontmatter.program" nova="numbers-dont-lie" />
        </li>
        <li>
            Animal Science -
            <NovaLink :program="$frontmatter.program" nova="what-a-life" />
        </li>
        <li>
            Archery -
            <NovaLink :program="$frontmatter.program" nova="hang-on" />,
            <NovaLink :program="$frontmatter.program" nova="launch" />
        </li>
        <li>
            Astronomy -
            <NovaLink :program="$frontmatter.program" nova="launch" />
        </li>
        <li>
            Athletics -
            <NovaLink :program="$frontmatter.program" nova="launch" />
        </li>
        <li>
            Automotive Maintenance -
            <NovaLink :program="$frontmatter.program" nova="power-up" />
        </li>
        <li>
            Aviation -
            <NovaLink :program="$frontmatter.program" nova="hang-on" />,
            <NovaLink :program="$frontmatter.program" nova="launch" />,
            <NovaLink :program="$frontmatter.program" nova="power-up" />,
            <NovaLink :program="$frontmatter.program" nova="up-and-away" />
        </li>
        <li>
            CAD Modeling -
            <NovaLink
                :program="$frontmatter.program"
                nova="something-from-nothing"
            />
        </li>
        <li>
            Canoeing -
            <NovaLink :program="$frontmatter.program" nova="power-up" />,
            <NovaLink :program="$frontmatter.program" nova="up-and-away" />
        </li>
        <li>
            Chemistry -
            <NovaLink :program="$frontmatter.program" nova="up-and-away" />,
            <NovaLink :program="$frontmatter.program" nova="wade" />
        </li>
        <li>
            Chess -
            <NovaLink :program="$frontmatter.program" nova="numbers-dont-lie" />
        </li>
        <li>
            Composite Materials -
            <NovaLink :program="$frontmatter.program" nova="hang-on" />
        </li>
        <li>
            Computer Hardware -
            <NovaLink :program="$frontmatter.program" nova="execute" />
        </li>
        <li>
            Computers -
            <NovaLink :program="$frontmatter.program" nova="numbers-dont-lie" />
        </li>
        <li>
            Cryptology -
            <NovaLink :program="$frontmatter.program" nova="execute" />
        </li>
        <li>
            Cybersecurity -
            <NovaLink :program="$frontmatter.program" nova="execute" />
        </li>
        <li>
            Cycling -
            <NovaLink :program="$frontmatter.program" nova="power-up" />
        </li>
        <li>
            Drafting -
            <NovaLink :program="$frontmatter.program" nova="hang-on" />,
            <NovaLink
                :program="$frontmatter.program"
                nova="numbers-dont-lie"
            />, <NovaLink :program="$frontmatter.program" nova="power-up" />
        </li>
        <li>
            Electricity -
            <NovaLink :program="$frontmatter.program" nova="power-up" />
        </li>
        <li>
            Electronics -
            <NovaLink :program="$frontmatter.program" nova="execute" />,
            <NovaLink :program="$frontmatter.program" nova="hang-on" />
        </li>
        <li>
            Energy -
            <NovaLink :program="$frontmatter.program" nova="power-up" />
        </li>
        <li>
            Engineering -
            <NovaLink :program="$frontmatter.program" nova="hang-on" />
        </li>
        <li>
            Entrepreneurship -
            <NovaLink :program="$frontmatter.program" nova="numbers-dont-lie" />
        </li>
        <li>
            Environmental Science -
            <NovaLink :program="$frontmatter.program" nova="wade" />,
            <NovaLink :program="$frontmatter.program" nova="what-a-life" />
        </li>
        <li>
            Farm Mechanics -
            <NovaLink :program="$frontmatter.program" nova="power-up" />
        </li>
        <li>
            Fish and Wildlife Management -
            <NovaLink :program="$frontmatter.program" nova="wade" />,
            <NovaLink :program="$frontmatter.program" nova="what-a-life" />
        </li>
        <li>
            Fishing - <NovaLink :program="$frontmatter.program" nova="wade" />,
            <NovaLink :program="$frontmatter.program" nova="what-a-life" />
        </li>
        <li>
            Fly-Fishing -
            <NovaLink :program="$frontmatter.program" nova="wade" />
        </li>
        <li>
            Forestry - <NovaLink :program="$frontmatter.program" nova="wade" />,
            <NovaLink :program="$frontmatter.program" nova="what-a-life" />
        </li>
        <li>
            Gardening -
            <NovaLink :program="$frontmatter.program" nova="what-a-life" />
        </li>
        <li>
            Geology - <NovaLink :program="$frontmatter.program" nova="wade" />
        </li>
        <li>
            Information Technology -
            <NovaLink :program="$frontmatter.program" nova="execute" />
        </li>
        <li>
            Insect Study -
            <NovaLink :program="$frontmatter.program" nova="what-a-life" />
        </li>
        <li>
            Inventing -
            <NovaLink :program="$frontmatter.program" nova="hang-on" />,
            <NovaLink
                :program="$frontmatter.program"
                nova="something-from-nothing"
            />
        </li>
        <li>
            Kayaking -
            <NovaLink :program="$frontmatter.program" nova="up-and-away" />
        </li>
        <li>
            Mammal Study -
            <NovaLink :program="$frontmatter.program" nova="what-a-life" />
        </li>
        <li>
            Medicine -
            <NovaLink :program="$frontmatter.program" nova="what-a-life" />
        </li>
        <li>
            Model Design and Building -
            <NovaLink :program="$frontmatter.program" nova="hang-on" />
        </li>
        <li>
            Modern Manufacturing -
            <NovaLink
                :program="$frontmatter.program"
                nova="something-from-nothing"
            />
        </li>
        <li>
            Motorboating -
            <NovaLink :program="$frontmatter.program" nova="power-up" />
        </li>
        <li>
            Nature - <NovaLink :program="$frontmatter.program" nova="wade" />,
            <NovaLink :program="$frontmatter.program" nova="what-a-life" />
        </li>
        <li>
            Networking -
            <NovaLink :program="$frontmatter.program" nova="execute" />
        </li>
        <li>
            Nuclear Science -
            <NovaLink :program="$frontmatter.program" nova="power-up" />
        </li>
        <li>
            Oceanography -
            <NovaLink :program="$frontmatter.program" nova="up-and-away" />,
            <NovaLink :program="$frontmatter.program" nova="wade" />,
            <NovaLink :program="$frontmatter.program" nova="what-a-life" />
        </li>
        <li>
            Orienteering -
            <NovaLink :program="$frontmatter.program" nova="numbers-dont-lie" />
        </li>
        <li>
            Personal management -
            <NovaLink :program="$frontmatter.program" nova="numbers-dont-lie" />
        </li>
        <li>
            Plant Science -
            <NovaLink :program="$frontmatter.program" nova="what-a-life" />
        </li>
        <li>
            Plumbing -
            <NovaLink :program="$frontmatter.program" nova="up-and-away" />
        </li>
        <li>
            Polymers and Plastics -
            <NovaLink
                :program="$frontmatter.program"
                nova="something-from-nothing"
            />
        </li>
        <li>
            Programming -
            <NovaLink :program="$frontmatter.program" nova="execute" />
        </li>
        <li>
            Public Health -
            <NovaLink :program="$frontmatter.program" nova="wade" />
        </li>
        <li>
            Radio -
            <NovaLink :program="$frontmatter.program" nova="numbers-dont-lie" />
        </li>
        <li>
            Railroading -
            <NovaLink :program="$frontmatter.program" nova="hang-on" />,
            <NovaLink :program="$frontmatter.program" nova="power-up" />
        </li>
        <li>
            Rifle Shooting -
            <NovaLink :program="$frontmatter.program" nova="hang-on" />,
            <NovaLink :program="$frontmatter.program" nova="launch" />
        </li>
        <li>
            Robotics -
            <NovaLink :program="$frontmatter.program" nova="execute" />,
            <NovaLink :program="$frontmatter.program" nova="hang-on" />,
            <NovaLink :program="$frontmatter.program" nova="launch" />
        </li>
        <li>
            Rowing -
            <NovaLink :program="$frontmatter.program" nova="up-and-away" />
        </li>
        <li>
            Scuba Diving -
            <NovaLink :program="$frontmatter.program" nova="up-and-away" />
        </li>
        <li>
            Sculpting -
            <NovaLink
                :program="$frontmatter.program"
                nova="something-from-nothing"
            />
        </li>
        <li>
            Shotgun Shooting -
            <NovaLink :program="$frontmatter.program" nova="hang-on" />,
            <NovaLink :program="$frontmatter.program" nova="launch" />
        </li>
        <li>
            Small-Boat Sailing -
            <NovaLink :program="$frontmatter.program" nova="power-up" />
        </li>
        <li>
            Social Media Marketing -
            <NovaLink :program="$frontmatter.program" nova="execute" />
        </li>
        <li>
            Soil and Water Conservation -
            <NovaLink :program="$frontmatter.program" nova="wade" />,
            <NovaLink :program="$frontmatter.program" nova="what-a-life" />
        </li>
        <li>
            Space Exploration -
            <NovaLink :program="$frontmatter.program" nova="launch" />,
            <NovaLink :program="$frontmatter.program" nova="power-up" />
        </li>
        <li>
            Surveying -
            <NovaLink :program="$frontmatter.program" nova="numbers-dont-lie" />
        </li>
        <li>
            Sustainability -
            <NovaLink :program="$frontmatter.program" nova="wade" />
        </li>
        <li>
            Swimming -
            <NovaLink :program="$frontmatter.program" nova="up-and-away" />
        </li>
        <li>
            Truck Transportation -
            <NovaLink :program="$frontmatter.program" nova="power-up" />
        </li>
        <li>
            Veterinary science -
            <NovaLink :program="$frontmatter.program" nova="what-a-life" />
        </li>
        <li>
            Weather -
            <NovaLink :program="$frontmatter.program" nova="launch" />,
            <NovaLink
                :program="$frontmatter.program"
                nova="numbers-dont-lie"
            />, <NovaLink :program="$frontmatter.program" nova="wade" />
        </li>
        <li>
            Wildlife conservation -
            <NovaLink :program="$frontmatter.program" nova="what-a-life" />
        </li>
        <li>
            Wood Carving -
            <NovaLink
                :program="$frontmatter.program"
                nova="something-from-nothing"
            />
        </li>
        <li>
            Wood Working -
            <NovaLink
                :program="$frontmatter.program"
                nova="something-from-nothing"
            />
        </li>
    </ul>
</template>
