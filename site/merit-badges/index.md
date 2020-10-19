---
title: Merit Badge Index
layout: smb
year: 2020
---

# List of Merit Badges

Find information and resources on each of the {{meritBadgeMeta.activeCount}} Scouts BSA merit badges offered in {{year}} by the Boy Scouts of America. Annual updates are released during the first quarter of the year.

The links below direct to the specific merit badge and its requirements as well as links to resources like the Scoutmaster Bucky Merit Badge Workbook and class preparation notes as well as the Scoutmaster Bucky Merit Badge History Pages.

All requirements are current as listed in the **{{year}} Scouts BSA Requirements** book unless otherwise noted.

## Merit Badge Index

{{#badge-list}}
{{#each meritBadges}}
{{#if active}}
{{>badge badge=@key}}
{{/if}}
{{/each}}
{{/badge-list}}
