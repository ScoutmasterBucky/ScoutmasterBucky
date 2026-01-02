#!/usr/bin/env node

import YAML from 'js-yaml';
import fs from 'fs';

const data = fs.readFileSync('./merit-badges.yaml', 'utf8');
const meritBadges = YAML.load(data);
let content = '';

for (const [key, badge] of Object.entries(meritBadges)) {
    content += `# Generated: ${badge.name}
- match: /merit-badges/${key}/${key}-cpp.pdf
  url: https://filestore.scoutmasterbucky.com/merit-badges/${key}/${key}-cpp.pdf
  date: 2025-12-11
  title: ${badge.name} merit badge class preparation page
- match: /merit-badges/${key}/${key}-pamphlet.pdf
  url: https://filestore.scoutmasterbucky.com/merit-badges/${key}/${key}-pamphlet.pdf
  date: 2025-12-11
  title: ${badge.name} merit badge pamphlet
- match: /merit-badges/${key}/${key}-workbook.pdf
  url: https://filestore.scoutmasterbucky.com/merit-badges/${key}/${key}-workbook.pdf
  date: 2025-12-11
  title: ${badge.name} merit badge workbook
- match: /merit-badges/${key}/${key}-workbook-*
  url: /merit-badges/${key}/
  date: 2025-12-11
  title: ${badge.name} merit badge workbook options
- match: /merit-badges/${key}/workbook*
  url: /merit-badges/${key}/
  date: 2025-12-14
  title: ${badge.name} merit badge resources, including workbooks
- match: /merit-badges/${key}/*
  url: /merit-badges/${key}/
  date: 2025-12-11
  title: ${badge.name} merit badge

`;
}

content += `# Documents
- match: /documents/mbaf.pdf
  url: https://filestore.scoutmasterbucky.com/documents/mbaf.pdf
  date: 2025-12-11
  title: Merit Badge Acknowledgement Form
- match: /documents/mbaqr.pdf
  url: https://filestore.scoutmasterbucky.com/documents/mbaqr.pdf
  date: 2025-12-11
  title: Merit Badge Advancement Quick Reference
- match: /documents/scout-planning-worksheet.pdf
  url: https://filestore.scoutmasterbucky.com/documents/scout-planning-worksheet.pdf
  date: 2025-12-11
  title: Scout Planning Worksheet
- match: /documents/uscg-float-plan.pdf
  url: https://filestore.scoutmasterbucky.com/documents/uscg-float-plan.pdf
  date: 2025-12-11
  title: USCG Float Plan
- match: /other-awards/50-miler/50-miler.pdf
  url: https://filestore.scoutmasterbucky.com/other-awards/50-miler/50-miler.pdf
  date: 2025-12-11
  title: 50-Miler Award Application
- match: /other-awards/aquatics-guide.pdf
  url: https://filestore.scoutmasterbucky.com/other-awards/aquatics-guide.pdf
  date: 2025-12-11
  title: Aquatics Guide
- match: /other-awards/complete-angler/complete-angler.pdf
  url: https://filestore.scoutmasterbucky.com/other-awards/complete-angler/complete-angler.pdf
  date: 2025-12-11
  title: Complete Angler Award Application

# Catch-all
- match: /merit-badges/*
  url: /merit-badges/
  date: 2025-12-11
  title: Merit Badges - Index
- match: /other-awards/*
  url: /other-awards/
  date: 2025-12-11
  title: Other Awards - Index
- match: /test-labs/*
  url: /test-labs/
  date: 2025-12-11
  title: Test Labs - Index
- match: /*
  url: /
  date: 2025-12-11
  title: Home Page
  description: If you can't find it anywhere else, try here
`
fs.writeFileSync('./redirects-2.yaml', content, 'utf8');
