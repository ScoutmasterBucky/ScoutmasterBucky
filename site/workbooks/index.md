---
title: Merit Badge Workbooks
layout: smb
---

# Scoutmaster Bucky Merit Badge Workbooks

Below you will find the most recent Scoutmaster Bucky Merit Badge Workbooks. Those not found here have not been developed yet but are currently in the process.

We are aware of the BSA's view on the use of merit badge workbooks. Despite the BSA's stance on merit badge workbooks, it is our belief that the issue is not the workbooks themselves, but rather the improper use of them.

**A merit badge workbook is *NOT* a sole means to validate, accredit, or confirm the completion of a merit badge requirement or any of its components by itself.**  No merit badge workbook, in and of itself is any measure of completion of a merit badge. The BSA's stance is that workbooks can be time-saving tools, but often they are used in the wrong way. The workbooks should only be used as a guide for Scouts to utilize for notes, recording, and organization purposes while the Scout is working with a counselor.

## Merit Badge Workbooks List

{{#badge-list}}
{{#each meritBadges}}
{{#if active}}
{{#if workbook}}
{{>bucky-badge badge=@key}}
{{/if}}
{{/if}}
{{/each}}
{{/badge-list}}
