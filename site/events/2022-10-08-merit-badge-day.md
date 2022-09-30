---
host: Scoutmaster Bucky
title: October Merit Badge Day
eventDateStart: 2022-10-08 08:00
eventDateEnd: 2022-10-08 16:00
location:
    - Our Father Lutheran Church
    - 3903 Gilbert Avenue SE
    - Rockford, Minnesota 55373
meritBadge: true
# These are for the dates in the merit badge classes
amStart: 2022-10-08 08:00
amEnd: 2022-10-08 12:00
pmStart: 2022-10-08 14:30
pmEnd: 2022-10-08 16:00
MidDayStart: 2022-10-08 08:00
MidDayEnd: 2022-10-08 14:30
ADStart: 2022-10-08 08:00
ADEnd: 2022-10-08 16:00
onSaleDate: 2022-09-01 0:05
---


### IN PERSON Morning Class

{{#badge-list}}
{{>badge badge="archaeology"}}
{{/badge-list}}
{{>eventbrite badge="archaeology" event="429257539857" start=amStart end=amEnd}}

### IN PERSON 3/4 Day Class

{{#badge-list}}
{{>badge badge="citizenship-in-the-community"}}
{{/badge-list}}
{{>eventbrite badge="citizenship-in-the-community" event="429332634467" start=MidDayStart end=MidDayEnd}}

### IN PERSON All Day

{{#badge-list}}
{{>badge badge="citizenship-in-society"}}
{{/badge-list}}
{{>eventbrite badge="citizenship-in-society" event="429253407497" start=ADStart end=ADEnd}}

### IN PERSON Afternoon Classes

{{#badge-list}}
{{>badge badge="family-life"}}
{{>badge badge="fingerprinting"}}
{{/badge-list}}
{{>eventbrite badge="family-life" event="429339133907" start=pmStart end=pmEnd}}
{{>eventbrite badge="fingerprinting" event="429277599857" start=pmStart end=pmEnd}}
