---
host: Scoutmaster Bucky
title: March Merit Badge Day
eventDateStart: 2022-03-12 08:00
eventDateEnd: 2022-03-12 16:00
location:
    - Normandale Hylands Methodist Church
    - 9920 Normandale Boulevard
    - Bloomington, Minnesota 55437
meritBadge: true
# These are for the dates in the merit badge classes
amStart: 2022-03-12 08:00
amEnd: 2022-03-12 11:30
pmStart: 2022-03-12 12:30
pmEnd: 2022-03-12 16:00
MidDayStart: 2022-03-12 10:00
MidDayEnd: 2022-03-12 14:30
onSaleDate: 2022-02-01 0:05
---
### Morning Classes

{{#badge-list}}
{{>badge badge="drafting"}}
{{>badge badge="emergency-preparedness"}}
{{>badge badge="engineering"}}
{{>badge badge="game-design"}}
{{>badge badge="safety"}}
{{/badge-list}}
{{>eventbrite badge="drafting" event="220148148037" start=amStart end=amEnd}}
{{>eventbrite badge="emergency-preparedness" event="220085249907" start=amStart end=amEnd}}
{{>eventbrite badge="engineering" event="220149953437" start=amStart end=amEnd}}
{{>eventbrite badge="game-design" event="220151447907" start=amStart end=amEnd}}
{{>eventbrite badge="safety" event="220115700987" start=amStart end=amEnd}}

### Mid-Day Classes

{{#badge-list}}
{{>badge badge="communication"}}
{{>badge badge="signs-signals-and-codes"}}
{{/badge-list}}
{{>eventbrite badge="communication" event="220082902887" start=MidDayStart end=MidDayEnd}}
{{>eventbrite badge="signs-signals-and-codes" event="220144477057" start=MidDayStart end=pmEnd}}


### Afternoon Classes

{{#badge-list}}
{{>badge badge="architecture"}}
{{>badge badge="chess"}}
{{>badge badge="emergency-preparedness"}}
{{>badge badge="inventing"}}
{{/badge-list}}
{{>eventbrite badge="architecture" event="220140254427" start=pmStart end=pmEnd}}
{{>eventbrite badge="chess" event="220154156007" start=pmStart end=pmEnd}}
{{>eventbrite badge="emergency-preparedness" event="220087677167" start=pmStart end=pmEnd}}
{{>eventbrite badge="inventing" event="220142671657" start=pmStart end=pmEnd}}
