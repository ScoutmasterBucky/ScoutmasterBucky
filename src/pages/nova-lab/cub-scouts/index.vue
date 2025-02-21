<page>
title: Cub Scout Nova Awards
layout: nova
program: cub-scouts
</page>

<template>
    <p>
        Nova awards are excellent ways to expand a Cub Scout's knowledge in
        several STEM-related fields. There is no minimum age for the Nova
        awards, but they typically start listing Cub Scout ranks with Wolf.
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
            <img src="/nova-lab/cub-scouts-nova-patch.webp" class="wide" />
        </ScaledContent>
        <ScaledContent>
            <img src="/nova-lab/nova-pi-device.webp" class="wide" />
        </ScaledContent>
    </MeritBadgeList>

    <p>
        Nova awards are earned by working with a registered Nova counselor, who
        will help ensure the requirements are met. Once earned, the Scout needs
        to have the advancement recorded by the pack.
    </p>

    <p>
        If this is the Cub Scout's first Nova award, they should be awarded with
        the Cub Scouts Nova patch, which has a light blue border as shown above.
        Subsequent Nova awards are recognized with a Pi device (the pin), which
        should be pinned to a point on the patch.
    </p>

    <h2>Supernova Awards</h2>

    <p>
        Seeking the next level of STEM awards? Want to impress your friends with
        an amazing medal that you wear on your uniform? You should investigage
        the <a href="../supernova/">Supernova awards</a> for Cub Scouts!
    </p>

    <MeritBadgeList>
        <SupernovaAward supernova="dr-luis-walter-alvarez" />
        <SupernovaAward supernova="dr-charles-h-townes" />
    </MeritBadgeList>

    <h2>Nova Awards by Adventure</h2>

    <p>
        Thinking of earning an adventure? Many can also count as progress
        towards a Nova award at the same time!
    </p>

    <h3>Wolf</h3>

    <ul>
        <li>
            Air of the Wolf –
            <NovaLink :program="$frontmatter.program" nova="fearful-symmetry" />
        </li>
        <li>
            Code of the Wolf –
            <NovaLink :program="$frontmatter.program" nova="1-2-3-go" />,
            <NovaLink :program="$frontmatter.program" nova="fearful-symmetry" />
        </li>
        <li>
            Collections &amp; Hobbies –
            <NovaLink :program="$frontmatter.program" nova="down-and-dirty" />,
            <NovaLink
                :program="$frontmatter.program"
                nova="out-of-this-world"
            />,
            <NovaLink
                :program="$frontmatter.program"
                nova="science-everywhere"
            />,
            <NovaLink
                :program="$frontmatter.program"
                nova="uncovering-the-past"
            />
        </li>
        <li>
            Digging in the Past –
            <NovaLink :program="$frontmatter.program" nova="down-and-dirty" />,
            <NovaLink :program="$frontmatter.program" nova="nova-wild" />,
            <NovaLink
                :program="$frontmatter.program"
                nova="science-everywhere"
            />
        </li>
        <li>
            Finding Your Way –
            <NovaLink :program="$frontmatter.program" nova="tech-talk" />
        </li>
        <li>
            Germs Alive! –
            <NovaLink
                :program="$frontmatter.program"
                nova="out-of-this-world"
            />,
            <NovaLink
                :program="$frontmatter.program"
                nova="science-everywhere"
            />
        </li>
        <li>
            Grow Something –
            <NovaLink :program="$frontmatter.program" nova="down-and-dirty" />,
            <NovaLink :program="$frontmatter.program" nova="nova-wild" />,
            <NovaLink
                :program="$frontmatter.program"
                nova="science-everywhere"
            />
        </li>
        <li>
            Motor Away -
            <NovaLink
                :program="$frontmatter.program"
                nova="fearful-symmetry"
            />,
            <NovaLink
                :program="$frontmatter.program"
                nova="out-of-this-world"
            />, <NovaLink :program="$frontmatter.program" nova="swing" />,
            <NovaLink :program="$frontmatter.program" nova="tech-talk" />
        </li>
        <li>
            Paws of Skill -
            <NovaLink :program="$frontmatter.program" nova="swing" />
        </li>
        <li>
            Spirit of Water –
            <NovaLink :program="$frontmatter.program" nova="nova-wild" />
        </li>
    </ul>

    <h3>Bear</h3>

    <ul>
        <li>
            Baloo the Builder -
            <NovaLink :program="$frontmatter.program" nova="swing" />
        </li>
        <li>
            A Bear Goes Fishing –
            <NovaLink :program="$frontmatter.program" nova="nova-wild" />,
            <NovaLink
                :program="$frontmatter.program"
                nova="science-everywhere"
            />, <NovaLink :program="$frontmatter.program" nova="swing" />
        </li>
        <li>
            Bear Picnic –
            <NovaLink
                :program="$frontmatter.program"
                nova="science-everywhere"
            />
        </li>
        <li>
            Beat of the Drum -
            <NovaLink
                :program="$frontmatter.program"
                nova="uncovering-the-past"
            />
        </li>
        <li>
            Critter Care –
            <NovaLink :program="$frontmatter.program" nova="nova-wild" />,
            <NovaLink
                :program="$frontmatter.program"
                nova="science-everywhere"
            />
        </li>
        <li>
            Forensics -
            <NovaLink
                :program="$frontmatter.program"
                nova="fearful-symmetry"
            />,
            <NovaLink :program="$frontmatter.program" nova="tech-talk" />
        </li>
        <li>
            Make it Move -
            <NovaLink :program="$frontmatter.program" nova="tech-talk" />
        </li>
        <li>
            Marble Madness -
            <NovaLink :program="$frontmatter.program" nova="fearful-symmetry" />
        </li>
        <li>
            Robotics -
            <NovaLink :program="$frontmatter.program" nova="1-2-3-go" />,
            <NovaLink
                :program="$frontmatter.program"
                nova="out-of-this-world"
            />
        </li>
        <li>
            Super Science –
            <NovaLink :program="$frontmatter.program" nova="down-and-dirty" />,
            <NovaLink
                :program="$frontmatter.program"
                nova="out-of-this-world"
            />
        </li>
    </ul>

    <h3>Webelos</h3>

    <ul>
        <li>
            Adventures in Science –
            <NovaLink :program="$frontmatter.program" nova="down-and-dirty" />,
            <NovaLink
                :program="$frontmatter.program"
                nova="out-of-this-world"
            />, <NovaLink :program="$frontmatter.program" nova="swing" />
        </li>
        <li>
            Art Explosion -
            <NovaLink :program="$frontmatter.program" nova="fearful-symmetry" />
        </li>
        <li>
            Build It -
            <NovaLink
                :program="$frontmatter.program"
                nova="fearful-symmetry"
            />,
            <NovaLink :program="$frontmatter.program" nova="tech-talk" />
        </li>
        <li>
            Earth Rocks! –
            <NovaLink :program="$frontmatter.program" nova="down-and-dirty" />,
            <NovaLink
                :program="$frontmatter.program"
                nova="science-everywhere"
            />
        </li>
        <li>
            Engineer -
            <NovaLink
                :program="$frontmatter.program"
                nova="out-of-this-world"
            />,
            <NovaLink :program="$frontmatter.program" nova="swing" />
        </li>
        <li>
            Fix It -
            <NovaLink :program="$frontmatter.program" nova="tech-talk" />
        </li>
        <li>
            Game Design -
            <NovaLink :program="$frontmatter.program" nova="1-2-3-go" />,
            <NovaLink
                :program="$frontmatter.program"
                nova="out-of-this-world"
            />
        </li>
        <li>
            Into the Wild -
            <NovaLink :program="$frontmatter.program" nova="nova-wild" />
        </li>
        <li>
            Into the Woods -
            <NovaLink :program="$frontmatter.program" nova="nova-wild" />
        </li>
        <li>
            Looking Back, Looking Forward -
            <NovaLink
                :program="$frontmatter.program"
                nova="uncovering-the-past"
            />
        </li>
        <li>
            Maestro! –
            <NovaLink
                :program="$frontmatter.program"
                nova="fearful-symmetry"
            />,
            <NovaLink
                :program="$frontmatter.program"
                nova="science-everywhere"
            />
        </li>
        <li>
            Movie Making -
            <NovaLink :program="$frontmatter.program" nova="tech-talk" />
        </li>
        <li>
            Project Family -
            <NovaLink
                :program="$frontmatter.program"
                nova="uncovering-the-past"
            />
        </li>
    </ul>
</template>
