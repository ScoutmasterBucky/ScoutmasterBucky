---
title: Merit Badge Index
layout: smb
year: 2024
---

# List of Merit Badges

Find information and resources on each of the {{meritBadgeMeta.activeCount}} Scouts BSA merit badges offered in {{year}} by the Boy Scouts of America. Annual updates are released during the first quarter of the year.

The links below direct to the specific merit badge and its requirements as well as links to resources like the Scoutmaster Bucky Merit Badge Workbook which includes class preparation notes under the "Requirements Insights" section. as well as the Scoutmaster Bucky Merit Badge History Pages.

All requirements are current as listed on https://www.scouting.org/programs/scouts-bsa/advancement-and-awards/merit-badges/ unless otherwise noted.

## Merit Badge Index

{{#badge-list}}
{{#each meritBadges}}
{{#if active}}
{{>badge badge=@key}}
{{/if}}
{{/each}}
{{/badge-list}}
