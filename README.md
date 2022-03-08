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

* `{{#smb-accent}}special words{{/smb-accent}}` - Wraps these words in a special color to make them stand out from other text.


Index Page
----------

The index page lists the events - they are slurped up into the index page. Also, these helpers and partials are only usable on the index page.

* `{{>event-badge-header badge="geocaching"}}` - Shows an event header with "Scoutmaster Bucky", the Bucky-themed image, and the round merit badge. Centers text below the "Scoutmaster Bucky" logo.

* `{{>event-banner host="The Location" title="Energy Extravaganza"}}` - Shows the banner at the top of an in-person event. Shows the starting time of the event (`eventDateStart`) using the color (`eventColor`) in the event's metadata.

* `{{>event-date-time-location start="2020-01-31T13:59:59Z" end="2020-01-31T15:05:00Z"}}` - Lists the date and time for the event, when it starts and when it ends. Also will set up the translation of the time into the browser's timezone if it is not the same as the site's. Only usable on the index page and in events.

* `{{>event-type-generic}}` - Wrapper for events without a more specific wrapper. Black border.

* `{{>event-type-merit-badge}}` - Wrapper for in-person events. Green border.

* `{{>event-type-online}}` - Wrapper for online events. Gold border.

* `{{>event}}` - Display an event using the event's metadata. Chooses what type of wrapper and headings to use.

* `{{>eventbrite}}` - Shows the Eventbrite iframe in a collapsible area. Can specify `badge`, otherwise shows `title`. `start` and `end` control the time displayed for the event.

* `{{#safety-warning}}warning text goes here{{/safety-warning}}` - Standard disclaimer area, but lets you have custom text. Typically used in the merit badge requirements pages.

* `{{>safety-warning-generic}}` - Standard disclaimer that Scouts not listening will be asked to leave. This is typically used in the merit badge requirements pages, but could be used anywhere.

* `{{>toggle-start}}Clickable Header{{>toggle-middle}}Collapsed content{{>toggle-end}}` - Shows a collapsible area. The "Clickable Header", when clicked, will toggle open the collapsed content.


### Events

Event files can have the following metadata.

* `host` - The person or organization putting on the event. This will show up above the date in the banner.
* `title` - The name of the event. Shows up below the date in the banner and is the text of the link in the calendar.
* `subtitle` - Additional description line. Shown as the second line in the calendar.
* `eventDateStart` - When the event starts. Appears in the header.
* `eventDateEnd` - When the event starts. Appears in the header.
* `borderColor` - When `online` is true, defaults to gold. When `meritBadge` is true, defaults to green. Otherwise defaults to black.
* `bannerDateColor` - Defaults to black.
* `location` - Array of strings for the location of the event.
* `meritBadge` - If `true`, uses the merit badge event colors and template.
* `online` - If `true`, uses the online event colors and template.
* `onSaleDate` - If set, this will show "Tickets go on sale MMMM D, YYYY" as long as that day is in the future.
* `eventBriteEventId` - For the generation of the registration link. Used for online events only.


Text and Markdown
-----------------

Text is used for many "Requirement List Items" and "Workbook List Items". There is typically a `text` property and a `markdown` property. The `markdown` property defaults to false, which means `text` is plain text or HTML. When `markdown` is true, then `text` is interpreted as markdown.

Another important note is that you can include as many lines of text as you want. The important thing is to make the YAML structured correctly, which heavily depends on the number of spaces at the beginning of the line.

When a link is displayed in a workbook, that link needs to be absolute (`https://scoutmasterbucky.com/...`) otherwise the generated PDF will not have the right link. Images need to be root-relative (`/merit-badges/athletics/athletics-basketball-positions.gif`) otherwise the workbook page or the requirements page will not have the right image.


Merit Badge Requirements
------------------------

Merit badge requirements are stored in `requirements.yaml` and both the requirements page and the workbook are built with the data.

The file is a list of these types of items - let's call them "Requirement List Items":

* Callout
* Detail
* Note
* Requirement


### Callout

Adds text between requirements. Centered, italicized. Useful for headings, "OR" or "AND" lines, and the like. Does not show up on the workbook.

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

Adds text between requirements that look like just another paragraph. Useful for footnotes and supplemental paragraphs. Does not show up on the workbook.

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

Defines a note for the requirements page only. Does not show up on workbooks.

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

Shows this one requirement. There's no extra sections generated for the workbook.

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
of "Requirement List Item." Still, there's nothing extra set up for the
workbook. Let's fix that.

```
- requirement: 3
  text: |-
      Do stuff. Write stuff down.
  workbook:
      - lines: 8
```

That sets up an 8-line section for this requirement. The list of different
"Workbook List Items" is detailed later. When you combine little requirements
into one section, you can use extra workbook areas. This next example is a bit
extreme.

```
- requirement: 4
  text: |-
      Research one of the following. Describe the term, then draw a picture to
      illustrate the term.
  workbook:
      - header: true
        markdown: true
        text: |-
            a - Rube-Goldberg machine

            OR

            b - Popsicle stick explosion
  children:
      - requirement: a
        text: |-
            Rube-Goldberg machine
        workbookHide: true
      - requirement: b
        text: |-
            Popsicle stick explosion
        workbookHide: true
```

`workbookHide` will not generate a section for that requirement.

The different workbook entries:

* Grid
* Header
* Lines
* Signature
* Split

Properties:

* `children`: Optional, list of "Requirement List Items"
* `markdown`: Optional, controls `text`
* `requirement`: The number or letter of the requirement
* `text`: Text / HTML / markdown to display
* `workbook`: Optional, list of "Workbook List Items"
* `workbookHide`: Optional, if `true` this hides the requirement from automatic
  generation in the workbook


Workbook Generation
-------------------

Workbooks are generated from the same `requirements.yaml` as the requirements page. Extra information is gathered from the `workbook` property in requirements.

"Workbook List Items" can be any of the following:

* Grid
* Header
* Lines
* Signature
* Split


### Grid

Shows a grid, which is useful for drawings. The height is measured in the
number of squares, which is very close to 1 centimeter. Due to technical
difficulties, the grid will not be part of the generated PDF, but it would
appear if a visitor to the site printed the workbook web page.

```
- gridHeight: 8
```

Optionally, a caption can be included above the grid.

```
- gridHeight: 8
  text: |-
      This is a caption
```

Properties:

* `gridHeight`: Number of rows to display
* `markdown`: Optional, controls `text`
* `text`: Optional, text / HTML / markdown to as a caption


### Header

Display text in the same size font as the requirement. The background is
slightly off. Good when combining requirements together to save on space.

```
- header: true
  markdown: true
  text: |-
      a - Height

      b - Width

      c - Area
```

Properties:

* `header`: Must be `true`
* `markdown`: Optional, controls `text`
* `text`: Text / HTML / markdown to as a caption


### Lines

Show a ruled area for an answer. Due to technical difficulties, the ruling
won't be included in the generated PDF, but it would show up if a visitor
printed the workbook's web page.

```
- lines: 8
```

Optionally, a caption can be included above the ruled area.

```
- lines: 8
  text: |-
      This is a caption.
```

Properties:

* `lines`: Number of lines to display
* `markdown`: Optional, controls `text`
* `text`: Optional, text / HTML / markdown to as a caption


### Signature

Include an area for an adult to sign off on the requirement. The `signature`
property defines who is being asked to sign.

```
- signature: Adult Leader
```

The checkbox label defaults to "Approved". If you would rather have it say
something else, it is configurable.

```
- signature: Librarian
  checkbox: Verified
```

Properties:

* `checkbox`: Optional, label for the checkbox (defaults to "Approved")
* `signature`: The label for the person that needs to sign


### Split

Split a row into even columns. Accepts a list of "Workbook List Items" and puts them on one row.

```
- split:
      - gridHeight: 6
        text: |-
            Draw the tool
      - lines: 8
        text: |-
            Describe the tool's function
```

Properties:

* `split`: List of "Workbook List Items"


Data Validation
---------------

YAML files and JSON data are both vetted against a schema to ensure proper parsing and that there's no structural errors. When it does not validate, an error message can be seen. Here is the top of a sample error.

```
Error: Error in data file: merit-badges/bird-study/index.md
{
    "message": "Data does not match any schemas from \"oneOf\"",
    "dataPath": "/5",
    "subErrors": [
        {
            "message": "Data does not match any schemas from \"oneOf\"",
            "dataPath": "/5/children/0",
            "subErrors": [
```

There are two important things to notice. First, this indicates that this is for the Bird Study merit badge. Most likely that means it is the `requirements.yaml` that builds the merit badge. The second important thing is the `"dataPath"` attribute. It will tell you how far it can get before an error shows up. In this case the important value is "/5/children/0".

Programmers start counting at 0. Sorry. That's just the way it is, but it is an important thing to remember when counting. When looking at the Bird Study requirements file, we will look for the **sixth** item in the list.

* First item is a note, and programmers count it as item number 0.
* Second item is requirement 1, item number 1
* Third item is requirement 2, item number 2
* Fourth item is requirement 3, item number 3
* Fifth item is requirement 4, item number 4
* Sixth item is requirement 5, **item number 5.**

That requirement has children, and the first item in that list has a problem. In my example it turned out that I had a typo in a property name.

This doesn't tell you how to fix it, but does help find and locate the errors.
