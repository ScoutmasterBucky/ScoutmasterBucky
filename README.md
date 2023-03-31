ScoutmasterBucky.com Web Site
=============================


Building
--------

First, get the prerequisites.

    npm install

Next, you simply run the `build` script.

    npm run build

Live server.

    npm run start


General-Purpose Partials and Helpers
------------------------------------

* `{{>badge badge="pioneering"}}` - Shows the merit badge's round badge, centers the name below it, and links the whole thing to the merit badge requirements.

* `{{#badge-list}}...{{/badge-list}}` - Wraps the listing to show some number of badges that would fill the browser's width.

* `{{#date format="MMMM D, YYYY"}}2020-01-31T13:59:59Z{{/date}}` - Reformat a date using the given format. If the `format` attribute is missing, this defaults to "MMMM D, YYYY" (January 1, 2020).

* `{{>badge-name badge="american-business"}}` - Used to look up a merit badge's name.

* `{{>bucky-badge badge="signs-signals-and-codes"}}` - Shows Bucky holding the round badge with the badge's name centered below it. The whole thing is linked to the workbook.

* `{{>countdown to="2020-01-31T13:59:59Z" message="Sorry, time is up"}}` - Shows a JavaScript countdown timer to a target time.

* `{{#figure}}...content...{{/figure}}` - Shows a scaling figure to the right (default) or the left (add `align="left"` in the first tag). Scales just like `{{#scaled}}`.

* `{{#figure-container}...figure...{{^}}...content{{/figure-container}}` - Shows a figure to the left or right. When on a phone, the figure will pop to the top or botom. Default is right side, then bottom when compressed. Change it by adding `align="left"` and `position="top"` to the first tag. Scaling happens just like `{{#scaled}}`.

* `{{#scaled}}...content...{{/scaled}}` - Shows the content (typically an image of a merit badge, rank, etc) in a box that scales with the size of the window. Makes it fit 5 across on desktop and scales down to 2 across on phones.

* `{{#smb-accent}}special words{{/smb-accent}}` - Wraps these words in a special color to make them stand out from other text.

* `{{#supernova-list}}...{{/supernova-list}}` - Shows Supernova awards and wraps them to show three, two, or one medal on a line, depending on the browser's width.


Index Page
----------

The index page lists the events - they are slurped up into the index page.

* `{{>event-badge-header badge="geocaching"}}` - Shows an event header with "Scoutmaster Bucky", the Bucky-themed image, and the round merit badge. Centers text below the "Scoutmaster Bucky" logo.

* `{{>event-date-time-location start="2020-01-31T13:59:59Z" end="2020-01-31T15:05:00Z"}}` - Lists the date and time for the event, when it starts and when it ends. Also will set up the translation of the time into the browser's timezone if it is not the same as the site's. Only usable on the index page and in events.

* `{{>event}}` - Display an event using the event's metadata. Chooses what type of wrapper and headings to use.

* `{{>eventbrite}}` - Shows the Eventbrite iframe in a collapsible area. Can specify `badge`, otherwise shows `title`. `start` and `end` control the time displayed for the event.

* `{{#safety-warning}}warning text goes here{{/safety-warning}}` - Standard disclaimer area, but lets you have custom text. Typically used in the merit badge requirements pages.

* `{{>safety-warning-generic}}` - Standard disclaimer that Scouts not listening will be asked to leave. This is typically used in the merit badge requirements pages, but could be used anywhere.


### Events

Event files can have the following metadata.

* `host` - The person or organization putting on the event. This will show up above the date in the banner.
* `title` - The name of the event. Shows up below the date in the banner and is the text of the link in the calendar.
* `subtitle` - Additional description line. Shown as the second line in the calendar.
* `eventDateStart` - When the event starts. Appears in the header.
* `eventDateEnd` - When the event starts. Appears in the header.
* `multipleDays` - If this spans multiple days, set this to `true` to show the both dates in the header.
* `hideTimes` - When set to `true`, only shows the event dates.
* `borderColor` - When `online` is true, defaults to gold. When `meritBadge` is true, defaults to green. Otherwise defaults to black.
* `bannerDateColor` - Defaults to black.
* `location` - Array of strings for the location of the event.
* `meritBadge` - If `true`, uses the merit badge event colors and template.
* `online` - If `true`, uses the online event colors and template.
* `onSaleDate` - If set, this will show "Tickets go on sale MMMM D, YYYY" as long as that day is in the future.
* `eventBriteEventId` - For the generation of the registration link. Used for online events only.


Text and Markdown
-----------------

Text is used for many "Requirement List Items". There can be both `text` and `markdown` properties. The `markdown` property defaults to false, which means `text` is plain text or HTML. When `markdown` is true, then `text` is interpreted as markdown.

Another important note is that you can include as many lines of text as you want. The important thing is to make the YAML structured correctly, which heavily depends on the number of spaces at the beginning of the line.


Merit Badge Requirements
------------------------

Merit badge requirements are stored in `requirements.yaml`.

The file is a list of these types of items - let's call them "Requirement List
Items":

* Callout
* Detail
* Note
* Requirement


### Callout

Adds text between requirements. Centered, italicized. Useful for headings, "OR"
or "AND" lines, and the like.

```
- callout: true
  text: |-
      This is a callout.
- callout: true
  markdown: true
  text: |-
      This is a second callout.

      Because it is two paragraphs, I need to use markdown.
```

Properties:

* `callout`: Must be `true`
* `markdown`: Optional, controls `text`
* `text`: Text / HTML / markdown to display


### Detail

Adds text between requirements that look like just another paragraph. Useful
for separators, headings, and additional information that isn't a requirement.

```
- detail: true
  text: |-
      * This item can only be done in person.
```

Properties:

* `detail`: Must be `true`
* `markdown`: Optional, controls `text`
* `text`: Text / HTML / markdown to display


### Note

Defines a note for the requirements page only.

```
- note:
      - inPerson
  text: |-
      This note is displayed only for the "in person" notes.
- note:
      - inPerson
      - online
  markdown: true
  text: |-
      This note is displayed on *both* "in person" and "online" notes.
```

Properties:

* `note`: A list of one or more items. Allowed items: `inPerson`, `online`
* `markdown`: Optional, controls `text`
* `text`: Text / HTML / markdown to display


### Requirement

Lists a requirement, which may have child requirements.

```
- requirement: 1
  text: |-
      Do ONE of the following:
```

Shows this one requirement.

```
- requirement: 2
  text: |-
      Showing how to use children
  children:
      - note:
            - online
        text: |-
            This note is for "requirement 2"
      - requirement: a
        text: |-
            Children can be requirements or any other type of object allowed at
            the top-level of the file, such as a note or callout.
      - callout: true
        text: |-
            AND
      - requirement: b
        text: |-
            Children can have their own children.
        children:
            - note:
                  - inPerson
              text: |-
                  This note is for "requirement 2 b"
      - note:
            - online
        text: |-
            Another note for "requirement 2"
```

This illustrates how notes and children can be added. Children can be any type
of "Requirement List Item."

Properties:

* `children`: Optional, list of "Requirement List Items"
* `markdown`: Optional, controls `text`
* `requirement`: The number or letter of the requirement
* `text`: Text / HTML / markdown to display


Data Validation
---------------

YAML files and JSON data are both vetted against a schema to ensure proper parsing and that there's no structural errors. When it does not validate, an error message can be seen. Here is the top of a sample error.

```
Error: Error in data file: merit-badges/bird-study/index.md
    /5/children/0: must have required property 'requirement'
    /5/children/0: must have required property 'note'
    /5/children/0: must have required property 'callout'
    /5/children/0: must have required property 'detail'
    /5/children/0: must match exactly one schema in oneOf
```

There are two important things to notice. First, this indicates that this is for the Bird Study merit badge. Most likely that means the error applies to `requirements.yaml` that builds the merit badge. The second important thing is the `/5/children/0` part. It will tell you how far the parsing worked until it found an error.

Programmers start counting at 0. Sorry. That's just the way it is, but it is an important thing to remember when counting. When looking at the Bird Study requirements file, we will look for the **sixth** item in the list.

* First item is a note, and programmers count it as item number 0.
* Second item is requirement 1, item number 1
* Third item is requirement 2, item number 2
* Fourth item is requirement 3, item number 3
* Fifth item is requirement 4, item number 4
* Sixth item is requirement 5, **item number 5.**

That requirement has children, and the first item (number 0) in that list has a problem. In my example it turned out that I had a typo in a property name.

This doesn't tell you how to fix it, but does help find and locate the errors.
