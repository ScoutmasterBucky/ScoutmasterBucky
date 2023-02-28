---
layout: smb-event
host: Scoutmaster Bucky
title: December Merit Badge Day
eventDateStart: 2021-12-04 8:00
eventDateEnd: 2021-12-04 16:00
location:
    - Shepherd of the Lake Lutheran Church
    - 3611 North Berens Road NW
    - Prior Lake, Minnesota 55379
meritBadge: true
# These are for the dates in the merit badge classes
amStart: 2021-12-04 8:00
amEnd: 2021-12-04 11:30
pmStart: 2021-12-04 12:00
pmEnd: 2021-12-04 15:30
---
### Morning Classes

{{#badge-list}}
{{>badge badge="citizenship-in-society"}}
{{>badge badge="digital-technology"}}
{{>badge badge="public-health"}}
{{>badge badge="scouting-heritage"}}
{{/badge-list}}
{{>eventbrite badge="citizenship-in-society" event="213405039217" start=amStart end=amEnd}}
{{>eventbrite badge="digital-technology" event="213411007067" start=amStart end=amEnd}}
{{>eventbrite badge="public-health" event="213419763257" start=amStart end=amEnd}}
{{>eventbrite badge="scouting-heritage" event="213494908017" start=amStart end=amEnd}}

### Afternoon Classes

{{#badge-list}}
{{>badge badge="american-heritage"}}
{{>badge badge="citizenship-in-society"}}
{{>badge badge="journalism"}}
{{>badge badge="reading" badge2="scholarship"}}
{{/badge-list}}
{{>eventbrite badge="american-heritage" event="213408178607" start=pmStart end=pmEnd}}
{{>eventbrite badge="citizenship-in-society" event="213421247697" start=pmStart end=pmEnd}}
{{>eventbrite badge="journalism" event="213415650957" start=pmStart end=pmEnd}}
{{>eventbrite badge="reading" badge2="scholarship" event="213408870677" start=pmStart end=pmEnd}}
