---
layout: smb-event
host: Scoutmaster Bucky
title: March Merit Badge Day
eventDateStart: 2020-03-14 8:00
eventDateEnd: 2020-03-14 15:30
location:
    - Emanuel Lutheran Church
    - 2075 70th St. E
    - Inver Grove Heights, MN 55077
meritBadge: true
# These are for the dates in the merit badge classes
amStart: 2020-03-14 08:00
amEnd: 2020-03-14 11:30
pmStart: 2020-03-14 12:30
pmEnd: 2020-03-14 15:30
---


### Morning Classes

{{#badge-list}}
{{>badge badge="citizenship-in-the-world"}}
{{>badge badge="communication"}}
{{>badge badge="composite-materials"}}
{{>badge badge="crime-prevention"}}
{{>badge badge="painting"}}
{{>badge badge="robotics"}}
{{>badge badge="search-and-rescue"}}
{{>badge badge="truck-transportation"}}
{{/badge-list}}

### Afternoon Classes

{{#badge-list}}
{{>badge badge="athletics" badge2="sports"}}
{{>badge badge="citizenship-in-the-nation"}}
{{>badge badge="communication"}}
{{>badge badge="radio"}}
{{>badge badge="sculpture"}}
{{>badge badge="soil-and-water-conservation"}}
{{>badge badge="surveying"}}
{{>badge badge="textile"}}
{{/badge-list}}

### Morning Classes

{{>eventbrite badge="citizenship-in-the-world" event="92489323055" start=amStart end=amEnd}}
{{>eventbrite badge="communication" event="92489459463" start=amStart end=amEnd}}
{{>eventbrite badge="composite-materials" event="92489796471" start=amStart end=amEnd}}
{{>eventbrite badge="crime-prevention" event="92489852639" start=amStart end=amEnd}}
{{>eventbrite badge="painting" event="92490129467" start=amStart end=amEnd}}
{{>eventbrite badge="robotics" event="92490161563" start=amStart end=amEnd}}
{{>eventbrite badge="search-and-rescue" event="92490195665" start=amStart end=amEnd}}
{{>eventbrite badge="truck-transportation" event="92490253839" start=amStart end=amEnd}}

### Afternoon Classes

{{>eventbrite badge="athletics" badge2="sports" event="92519290689" start=pmStart end=pmEnd}}
{{>eventbrite badge="citizenship-in-the-nation" event="92489228773" start=pmStart end=pmEnd}}
{{>eventbrite badge="communication" event="92489491559" start=pmStart end=pmEnd}}
{{>eventbrite badge="radio" event="92490354139" start=pmStart end=pmEnd}}
{{>eventbrite badge="sculpture" event="92518941645" start=pmStart end=pmEnd}}
{{>eventbrite badge="soil-and-water-conservation" event="92518967723" start=pmStart end=pmEnd}}
{{>eventbrite badge="surveying" event="92518987783" start=pmStart end=pmEnd}}
{{>eventbrite badge="textile" event="92519011855" start=pmStart end=pmEnd}}
