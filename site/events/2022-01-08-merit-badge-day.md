---
host: Scoutmaster Bucky
title: January Merit Badge Day
eventDateStart: 2022-01-08T08:00-06:00
eventDateEnd: 2022-01-08T16:00-06:00
location:
    - Christ the King Lutheran Church
    - 8600 Fremont Avenue South
    - Bloomington, Minnesota 55420
meritBadge: true
# These are for the dates in the merit badge classes
amStart: 2022-01-08T08:00-06:00
amEnd: 2022-01-08T11:30-06:00
pmStart: 2022-01-08T12:30-06:00
pmEnd: 2022-01-08T16:00-06:00
MidDayStart: 2022-01-08T10:00-06:00
MidDayEnd: 2022-01-08T14:30-06:00
---
### Morning Classes

{{#badge-list}}
{{>badge badge="art"}}
{{>badge badge="citizenship-in-the-world"}}
{{>badge badge="entrepreneurship"}}
{{>badge badge="graphic-arts"}}
{{>badge badge="soil-and-water-conservation"}}
{{/badge-list}}
{{>eventbrite badge="art" event="220072732467" start=amStart end=amEnd}}
{{>eventbrite badge="citizenship-in-the-world" event="219998149387" start=amStart end=amEnd}}
{{>eventbrite badge="entrepreneurship" event="220066483777" start=amStart end=amEnd}}
{{>eventbrite badge="graphic-arts" event="220064287207" start=amStart end=amEnd}}
{{>eventbrite badge="soil-and-water-conservation" event="220067958187" start=amStart end=amEnd}}

### Mid-Day Class

{{#badge-list}}
{{>badge badge="communication"}}
{{/badge-list}}
{{>eventbrite badge="communication" event="220075440567" start=MidDayStart end=MidDayEnd}}


### Afternoon Classes

{{#badge-list}}
{{>badge badge="citizenship-in-the-world"}}
{{>badge badge="geology"}}
{{>badge badge="pulp-and-paper"}}
{{>badge badge="salesmanship"}}
{{>badge badge="theater"}}
{{/badge-list}}
{{>eventbrite badge="citizenship-in-the-world" event="220010105147" start=pmStart end=pmEnd}}
{{>eventbrite badge="geology" event="220019924517" start=pmStart end=pmEnd}}
{{>eventbrite badge="pulp-and-paper" event="220015982727" start=pmStart end=pmEnd}}
{{>eventbrite badge="salesmanship" event="220062301267" start=pmStart end=pmEnd}}
{{>eventbrite badge="theater" event="220048650437" start=pmStart end=pmEnd}}
