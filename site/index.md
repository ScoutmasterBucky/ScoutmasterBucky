---
title: Scoutmaster Bucky
layout: smb
opportunities: 13,875
online: 990
news:
    - ONLINE Opportunities added
    - March 28th and April 25th in-person Scoutmaster Bucky Events have been cancelled. Refunds have been distributed and will be made in full starting March 16.
    - With many Scouts out of school, we have ramped up our online offerings to help accommodate the demand for merit badge opportunities. We will do what we can to make as many opportunities available to as many Scouts as possible. Keep checking the website for new and more opportunities
css:
    - calendar.css
js:
    - /js/jquery-3.4.1.min.js
    - /js/jquery.e-calendar-0.9.2.js
    - index.js
---

# <div class="D(f) Jc(sb) Ai(b) Fxd(c)--xs"><div>Welcome</div><div class="Fz(0.4em) Fw(n) Tt(n)">Last Update: {{last-update}}</div></div>

<div class="C(smbPageSecondaryText) Fw(b) Fz(2em) D(f) Jc(c)">Scoutmaster Bucky</div>
<div class="D(f) Jc(c) Pb(1em)">Serving Scouts since January 2009</div>

<div class="Maw(450px) Ta(c) Mx(a)">Over {{#smb-accent}}{{opportunities}}+{{/smb-accent}} Scout merit badge opportunities, over {{#smb-accent}}{{online}}+{{/smb-accent}} Scout online merit badge opportunities, and thousands of Cub Scout and Venturing advancement opportunities.</div>

<div class="Ta(c) Mt(1em)">Remember the Scout Motto: {{#smb-accent}}Be Prepared{{/smb-accent}}</div>

<div class="Ta(c)">At Scoutmaster Bucky events this is not a request, wish, or desire…</div>

<div class="Ta(c)">{{#smb-accent}}it is an expectation.{{/smb-accent}}</div>

## Scoutmaster Bucky Event Calendar

<div id="calendar" class="Mb(0.9em)"></div>

Registration opens at 12:05 am on the first of the month for the following month's activities. The only exception is that February events open on January 2 at 12:05 am. Some events do open for registration earlier, so please check events carefully below.

## News

<div class="D(f) Fxd(c)--s">
    <div class="W(189px) Maw(90%) Mx(a)--s">
        <img src="images/bucky-with-newspaper.jpg" class="W(189px) Maw(100%)" />
    </div>
    <div>
{{#news}}
        <div class="D(f)">
            <div class="D(f) C(red) Fw(b) Px(8px)">NEW!</div>
            <div>{{.}}</div>
        </div>
{{/news}}
    </div>
</div>

<iframe src="https://www.google.com/maps/d/u/0/embed?mid=1vdI1j549x1Ft6VQmoRYcZaIH5etwe0vz" class="W(100%) H(480px) Mah(50vh) Mt(0.9em)" loading="lazy"></iframe>
