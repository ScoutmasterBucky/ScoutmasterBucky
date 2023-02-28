---
layout: smb-event
host: Scoutmaster Bucky
title: November Merit Badge Day
eventDateStart: 2022-11-05 8:00
eventDateEnd: 2022-11-05 16:00
location:
    - Christ the King Lutheran Church
    - 8600 Fremont Avenue South
    - Bloomington, MN 55420
meritBadge: true
# These are for the dates in the merit badge classes
amStart: 2022-11-05 08:00
amEnd: 2022-11-05 11:30
pmStart: 2022-11-05 12:30
pmEnd: 2022-11-05 16:00
---


### Morning Classes

{{#badge-list}}
{{>badge badge="american-cultures"}}
{{>badge badge="citizenship-in-the-world"}}
{{>badge badge="electricity"}}
{{>badge badge="radio"}}
{{/badge-list}}

### Afternoon Classes

{{#badge-list}}
{{>badge badge="archaeology"}}
{{>badge badge="chemistry"}}
{{>badge badge="citizenship-in-the-world"}}
{{>badge badge="electricity"}}
{{/badge-list}}

### Morning Classes

{{>eventbrite badge="american-cultures" event="444365096967" start=amStart end=amEnd}}
{{>eventbrite badge="citizenship-in-the-world" event="445893087227" start=amStart end=amEnd}}
{{>eventbrite badge="electricity" event="445891071197" start=amStart end=amEnd}}
{{>eventbrite badge="radio" event="445890740207" start=amStart end=amEnd}}

### Afternoon Classes

{{>eventbrite badge="archaeology" event="445892003987" start=pmStart end=pmEnd}}
{{>eventbrite badge="chemistry" event="445892736177" start=pmStart end=pmEnd}}
{{>eventbrite badge="citizenship-in-the-world" event="445893699057" start=pmStart end=pmEnd}}
{{>eventbrite badge="electricity" event="445891763267" start=pmStart end=pmEnd}}
