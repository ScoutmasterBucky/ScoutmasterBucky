---
title: Merit Badge Index
layout: smb
year: 2025
---

# List of Merit Badges

Find information and resources on each of the {{meritBadgeMeta.activeCount}} Scouts BSA merit badges offered in {{year}} by the Boy Scouts of America. Biannual updates are released during the first quarter and third quarter of the year.

The links below direct to the specific merit badge and its requirements as well as links to resources like the Scoutmaster Bucky Merit Badge Workbook, Class Preparation Page, as well as the Scoutmaster Bucky Merit Badge History Pages (coming soon).

All requirements are current as listed on https://www.scouting.org/programs/scouts-bsa/advancement-and-awards/merit-badges/ unless otherwise noted.

## Merit Badge Index

{{#badge-list}}
{{#each meritBadges}}
{{#if active}}
{{>badge badge=@key}}
{{/if}}
{{/each}}
{{/badge-list}}
