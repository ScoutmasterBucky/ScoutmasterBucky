# Event File Format Information

The events are stored as one event per file. Each event is in YAML format and can span multiple days.


## Required Properties

* title: The title of an event.
* host: Who is putting on the event.
* icon: Path to an image.
* start: Central time, 'YYYY-MM-DD HH:MM' or 'YYYY-MM-DD'

## Optional Properties

* end: Central time, 'YYYY-MM-DD HH:MM' or 'YYYY-MM-DD'
* location: List of strings for the address. If no location is present, the event is "online".
* meritBadges: List of merit badge IDs.
* registrationLink: URL for signing up.
* html: Extra text. "Heredoc", which means using |- and indenting the following lines.
* noticeTile: Short title for a notice banner on the event tile.
* noticeHtml: Longer text for a notice banner on the event modal. Supports HTML.

## Examples

In person events have a location.

```
title: Fish In A Barrel
host: Worst Scouter Ever
icon: /events/shooting-fish-in-barrel.png
start: '2020-04-01 08:30'
end: '2020-04-01 13:30'
location:
    - Lake Mariah
    - 1234 Fake Oak Way
    - Antibuckyville, MN, 55000
meritBadges:
    - fishing
    - rifle-shooting
    - shotgun-shooting
testLabs:
    - life-skills
registrationLink: https://evil-site.com/
html: |-
    <p>Stay away from this event, where they catch fish, then put them
    into a barrel, and then shoot the fish.</p>
noticeTile: |-
    Short title for a notice banner
noticeHtml: |-
    Lots and lots of description. Supports HTML.
```

Online events do not have a location.

```
title: ONLINE - Photography Merit Badge
host: Scoutmaster Bucky
icon: /merit-badges/photography/photography.png
start: 2025-02-14 18:00
end: 2025-02-14 21:30
meritBadges:
    - photography
registrationLink: https://example.com/
```
