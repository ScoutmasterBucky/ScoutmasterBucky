---
host: Scoutmaster Bucky
title: April Merit Badge Day
eventDateStart: 2023-04-15 8:00
eventDateEnd: 2023-04-15 16:00
location:
    - Emanuel Luthern Church
    - 2075 70th Street East
    - Inver Grove Heights, Minnesota 55077
meritBadge: true
# These are for the dates in the merit badge classes
amStart: 2023-04-15 8:00
amEnd: 2023-04-15 11:30
pmStart: 2023-04-15 12:30
pmEnd: 2023-04-15 16:00
MidDayStart: 2023-04-15 09:00
MidDayEnd: 2023-04-15 16:00
onSaleDate: 2023-03-01 0:05
---
### Morning Classes

{{#badge-list}}
{{>badge badge="american-heritage"}}
{{>badge badge="citizenship-in-the-community"}}
{{>badge badge="composite-materials"}}
{{>badge badge="inventing"}}
{{>badge badge="mammal-study"}}
{{>badge badge="public-health"}}
{{/badge-list}}
{{>eventbrite badge="american-heritage" event="523989555867" start=amStart end=amEnd}}
{{>eventbrite badge="citizenship-in-the-community" event="524761855837" start=amStart end=amEnd}}
{{>eventbrite badge="composite-materials" event="523967921157" start=amStart end=amEnd}}
{{>eventbrite badge="inventing" event="523955152967" start=amStart end=amEnd}}
{{>eventbrite badge="mammal-study" event="523991291057" start=amStart end=amEnd}}
{{>eventbrite badge="public-health" event="524704885437" start=amStart end=amEnd}}

### Mid-Day Class

{{#badge-list}}
{{>badge badge="emergency-preparedness"}}
{{/badge-list}}
{{>eventbrite badge="emergency-preparedness" event="525328962067" start=MidDayStart end=MidDayEnd}}


### Afternoon Classes

{{#badge-list}}
{{>badge badge="american-labor"}}
{{>badge badge="automotive-maintenance"}}
{{>badge badge="bird-study"}}
{{>badge badge="citizenship-in-the-community"}}
{{>badge badge="health-care-professions"}}
{{>badge badge="scouting-heritage"}}

{{/badge-list}}
{{>eventbrite badge="american-labor" event="523988482657" start=pmStart end=pmEnd}}
{{>eventbrite badge="automotive-maintenance" event="523967961277" start=pmStart end=pmEnd}}
{{>eventbrite badge="bird-study" event="524615086847" start=pmStart end=pmEnd}}
{{>eventbrite badge="citizenship-in-the-community" event="524796780297" start=pmStart end=pmEnd}}
{{>eventbrite badge="health-care-professions" event="524699569537" start=pmStart end=pmEnd}}
{{>eventbrite badge="scouting-heritage" event="525087038467" start=pmStart end=pmEnd}}

