---
layout: smb-event
host: Scoutmaster Bucky
title: February Merit Badge Day
eventDateStart: 2023-02-11 8:00
eventDateEnd: 2023-02-11 16:00
location:
    - Christ the King Lutheran Church
    - 8600 Fremont Avenue South
    - Bloomington, Minnesota 55420
meritBadge: true
# These are for the dates in the merit badge classes
amStart: 2023-02-11 8:00
amEnd: 2023-02-11 11:30
pmStart: 2023-02-11 12:30
pmEnd: 2023-02-11 16:00
MidDayStart: 2023-02-11 10:00
MidDayEnd: 2023-02-11 15:00
onSaleDate: 2023-01-02 0:05
---
### Morning Classes

{{#badge-list}}
{{>badge badge="art"}}
{{>badge badge="communication"}}
{{>badge badge="crime-prevention"}}
{{>badge badge="safety"}}
{{/badge-list}}
{{>eventbrite badge="art" event="523948352627" start=amStart end=amEnd}}
{{>eventbrite badge="communication" event="523845244227" start=amStart end=amEnd}}
{{>eventbrite badge="crime-prevention" event="524625678527" start=amStart end=amEnd}}
{{>eventbrite badge="safety" event="524631054607" start=amStart end=amEnd}}


### Afternoon Classes

{{#badge-list}}
{{>badge badge="animation"}}
{{>badge badge="athletics" badge2="sports"}}
{{>badge badge="communication"}}
{{>badge badge="pets"}}
{{/badge-list}}
{{>eventbrite badge="animation" event="523967830887" start=pmStart end=pmEnd}}
{{>eventbrite badge="athletics" badge2="sports" event="524607373777" start=pmStart end=pmEnd}}
{{>eventbrite badge="communication" event="523852856997" start=pmStart end=pmEnd}}
{{>eventbrite badge="pets" event="524623622377" start=pmStart end=pmEnd}}
