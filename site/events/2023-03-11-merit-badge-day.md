---
host: Scoutmaster Bucky
title: March Merit Badge Day
eventDateStart: 2023-03-11 8:00
eventDateEnd: 2023-03-11 16:00
location:
    - Guardian Angels Catholic Church
    - 8260 4th Street North
    - Oakdale, Minnesota 55128
meritBadge: true
# These are for the dates in the merit badge classes
amStart: 2023-03-11 8:00
amEnd: 2023-03-11 11:30
pmStart: 2023-03-11 12:30
pmEnd: 2023-03-11 16:00
MidDayStart: 2023-03-11 09:00
MidDayEnd: 2023-03-11 15:00
onSaleDate: 2023-02-01 0:05
---
### Morning Classes

{{#badge-list}}
{{>badge badge="chess"}}
{{>badge badge="citizenship-in-the-world"}}
{{>badge badge="genealogy"}}
{{>badge badge="music"}}
{{>badge badge="salesmanship"}}
{{>badge badge="theater"}}
{{/badge-list}}
{{>eventbrite badge="chess" event="524602398897" start=amStart end=amEnd}}
{{>eventbrite badge="citizenship-in-the-world" event="524827853237" start=amStart end=amEnd}}
{{>eventbrite badge="genealogy" event="525060689657" start=amStart end=amEnd}}
{{>eventbrite badge="music" event="524632990397" start=amStart end=amEnd}}
{{>eventbrite badge="salesmanship" event="523833368707" start=amStart end=amEnd}}
{{>eventbrite badge="theater" event="525059576327" start=amStart end=amEnd}}

### Mid-Day Class

{{#badge-list}}
{{>badge badge="pioneering"}}
{{>badge badge="signs-signals-and-codes"}}
{{/badge-list}}
{{>eventbrite badge="pioneering" event="524800762207" start=MidDayStart end=MidDayEnd}}
{{>eventbrite badge="signs-signals-and-codes" event="525325682257" start=MidDayStart end=MidDayEnd}}


### Afternoon Classes

{{#badge-list}}
{{>badge badge="american-business"}}
{{>badge badge="bugling"}}
{{>badge badge="citizenship-in-the-world"}}
{{>badge badge="law"}}
{{>badge badge="reading" badge2="scholarship"}}
{{>badge badge="truck-transportation"}}

{{/badge-list}}
{{>eventbrite badge="american-business" event="523820750967" start=pmStart end=pmEnd}}
{{>eventbrite badge="bugling" event="524618446897" start=pmStart end=pmEnd}}
{{>eventbrite badge="citizenship-in-the-world" event="524805065077" start=pmStart end=pmEnd}}
{{>eventbrite badge="law" event="524803209527" start=pmStart end=pmEnd}}
{{>eventbrite badge="reading" badge2="scholarship" event="524582208507" start=pmStart end=pmEnd}}
{{>eventbrite badge="truck-transportation" event="524798375067" start=pmStart end=pmEnd}}

