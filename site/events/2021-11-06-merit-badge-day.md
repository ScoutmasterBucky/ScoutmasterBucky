---
host: Scoutmaster Bucky
title: November Merit Badge Day
eventDateStart: 2021-11-06T08:00-05:00
eventDateEnd: 2021-11-06T16:00-05:00
location:
    - Emanuel Lutheran Church
    - 2075 70th Street East
    - Inver Grove Heights, MN 55077
meritBadge: true
# These are for the dates in the merit badge classes
amStart: 2021-11-96T08:00-05:00
amEnd: 2021-11-06T11:30-05:00
pmStart: 2021-11-06T12:30-05:00
pmEnd: 2021-11-06T16:00-05:00
adEnd: 2021-11-06T14:30-05:00
---
### 3/4 Day Class

{{#badge-list}}
{{>badge badge="citizenship-in-the-community"}}
{{/badge-list}}
{{>eventbrite badge="citizenship-in-the-community" event="203995826007" start=amStart end=adEnd}}

### Morning Classes

{{#badge-list}}
{{>badge badge="american-heritage"}}
{{>badge badge="coin-collecting"}}
{{/badge-list}}
{{>eventbrite badge="american-heritage" event="204013157847" start=amStart end=amEnd}}
{{>eventbrite badge="coin-collecting" event="204026337267" start=amStart end=amEnd}}

### Afternoon Classes

{{#badge-list}}
{{>badge badge="collections"}}
{{>badge badge="programming"}}
{{/badge-list}}

{{>eventbrite badge="collections" event="204028032337" start=pmStart end=pmEnd}}
{{>eventbrite badge="programming" event="204020951157" start=pmStart end=pmEnd}}
