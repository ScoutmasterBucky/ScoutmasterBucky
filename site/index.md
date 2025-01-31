---
title: Scoutmaster Bucky
layout: smb
opportunities: 15,000+
online: 2,250+
# Show the news section when there are items in the list.
# Add items to the news so they look like this:
# news:
#     - This is news item 1
#     - A second news item.
news:
js:
    - js/index.js
---

<div class="D(f) Fxd(c)--sm Jc(spa)">
<div>
<div class="C(--themeText) Fw(b) Fz(2em) D(f) Jc(c)">Welcome from Scoutmaster Bucky</div>
<div class="D(f) Jc(c) Pb(1em)">Serving Scouts since January 2009</div>
<div class="Ta(c) Mt(1em)">Remember the Scout Motto: <smb-accent>Be Prepared</smb-accent></div>
<div class="Ta(c)">at Scoutmaster Bucky events this is not a request, wish, or desire…</div>
<div class="Ta(c)"><smb-accent>it is an expectation.</smb-accent></div>
</div>


<!--
<div class="D(f) Ai(c) Fxd(c) Maw(30%)--l Maw(25%)--_sml">
<a class="D(f) Jc(c)" href="/dnd/"><img src="/dnd/bucky-guild.png" class="W(80%)--_sm W(35%)--m W(60%)--s H(a) Bgc(black) Bdrs(1em)"></a>
<div class="Pt(0.4em) Tt(u) Fw(b) Fz(1.2em)">Dungeons &amp; Dragons</div>
<p>Join Scoutmaster Bucky and his team of Dungeon Masters on October 5th.</p>
<p><a href="/dnd/">Learn more!</a></p>
</div>
-->

</div>

{{#if news}}

## News

{{#figure-container align="left" position="top"}}
<img src="{{@root.rootPath}}images/bucky-with-newspaper.jpg" class="W(100%) H(a)" width="189" height="225" />
{{^}}

{{#news}}

<div class="D(f)">
<div class="D(f) C(red) Fw(b) Px(8px)">NEW!</div>
<div>

{{.}}

</div>
</div>
{{/news}}
{{/figure-container}}
{{/if}}

## Upcoming Events

<div class="D(f) Fxw(w) Jc(sb) Ai(fs) Ta(in)">
{{#ancestry.childrenByName.events.ancestry.members}}
{{>event-tile event=.}}
{{/ancestry.childrenByName.events.ancestry.members}}
</div>

## Disclaimer

The Scoutmaster Bucky program is a volunteer run program managed and maintained entirely by Brian Reiners (Scoutmaster Bucky) in conjunction with the council of Northern Star Scouting and other Scouting volunteers. All content, scheduling, arrangements, and the like are managed by Scoutmaster Bucky. All proceeds collected go to cover program expenses and operating costs (including but not limited to building rentals, program materials, class materials, and technology support), with any profits (when and if there are any) put back into the Scouting program annually.

## Policies & Contact Information

{{#figure-container}}
<img src="images/bucky-waving.jpg" alt="Bucky Waving" class="W(100%) H(a)"/>
{{^}}
Requests for refunds or cancellations will be honored up to a week prior to any Scoutmaster Bucky event.

Due to the high demand, only one Eagle-required merit badge is allowed per Scout per opportunity.

Scoutmaster Bucky is Brian Reiners and is registered in Northern Star Scouting of the Boy Scouts of America.

Contact number: 612-483-0665<br />
Email: <a href="mailto:ScoutmasterBucky@yahoo.com?subject=Home Page Inquiry">ScoutmasterBucky@yahoo.com</a>

Learn more about [being a counselor for Bucky](/counselors/).

Last Update: {{#date}}{{buildDate}}{{/date}}

{{/figure-container}}
