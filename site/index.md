---
title: Scoutmaster Bucky
layout: smb
opportunities: 15,000+
online: 1,500+
news:
    - Added several online offerings throughout May and June.
css:
    - css/calendar.css
js:
    - js/jquery-3.4.1.min.js
    - js/jquery.e-calendar-0.9.3.js
    - index.js
---

<script>window.events = [];</script>

# <div class="D(f) Jc(sb) Ai(b) Fxd(c)--s"><div>Welcome</div><div class="Fz(0.4em) Fw(n) Tt(n)">Last Update: {{#date}}{{buildDate}}{{/date}}</div></div>

<div class="C(smbThmTx) Fw(b) Fz(2em) D(f) Jc(c)">Scoutmaster Bucky</div>
<div class="D(f) Jc(c) Pb(1em)">Serving Scouts since January 2009</div>

<div class="Maw(450px) Ta(c) Mx(a)">Over {{#smb-accent}}{{opportunities}}{{/smb-accent}} Scout merit badge opportunities, over {{#smb-accent}}{{online}}{{/smb-accent}} Scout online merit badge opportunities, and thousands of Cub Scout and Venturing advancement opportunities.</div>

<div class="Ta(c) Mt(1em)">Remember the Scout Motto: {{#smb-accent}}Be Prepared{{/smb-accent}}</div>

<div class="Ta(c)">At Scoutmaster Bucky events this is not a request, wish, or desire…</div>

<div class="Ta(c)">{{#smb-accent}}it is an expectation.{{/smb-accent}}</div>

## Scoutmaster Bucky Event Calendar

<div id="calendar" class="Mb(0.9em) H(218px) H(426px)--m"></div>

Registration opens at 12:05 am on the first of the month for the following month's activities. The only exception is that February events open on January 2 at 12:05 am. Some events do open for registration earlier, so please check events carefully below.

## News

<div class="D(f) Fxd(c)--m">
<div class="Maw(189px) Mx(a)--m W(30%)--m">
<img src="{{@root.rootPath}}images/bucky-with-newspaper.jpg" class="W(100%) H(a)" width="189" height="225" />
</div>
<div>
{{#news}}
<div class="D(f)">
<div class="D(f) C(red) Fw(b) Px(8px)">NEW!</div>
<div>

{{.}}

</div>
</div>
{{/news}}
</div>
</div>

## Disclaimer

The Scoutmaster Bucky program is a volunteer run program managed and maintained entirely by Brian Reiners (Scoutmaster Bucky) in conjunction with the council of Northern Star Scouting and other Scouting volunteers. All content, scheduling, arrangements, and the like are managed by Scoutmaster Bucky. All proceeds collected go to cover program expenses and operating costs (including but not limited to building rentals, program materials, class materials, and technology support), with any profits (when and if there are any) put back into the Scouting program annually.

## Refund Policy & Contact Information

<div class="D(f) Fxd(c)--s"><div>

Requests for refunds or cancellations will be honored up to a week prior to any event.

Scoutmaster Bucky is Brian Reiners and is registered in Northern Star Scouting of the Boy Scouts of America.

Contact number: 612-483-0665<br />
Email: <a href="mailto:ScoutmasterBucky@yahoo.com?subject=Home Page Inquiry">ScoutmasterBucky@yahoo.com</a>

</div>
<div class="Maw(30%)--s Maw(15%) Maw(20%)--m M(a)--s">
<img src="images/bucky-waving.jpg" alt="Bucky Waving" class="W(100%) H(a)"/>
</div>
</div>

## UPCOMING EVENTS

{{#ancestry.childrenByName.events.ancestry.members}}
{{>event}}
{{/ancestry.childrenByName.events.ancestry.members}}
