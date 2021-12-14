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


Merit Badge Requirements
------------------------

Before requirements are listed, one can use any of the partials or helpers listed above.

Requirements pages have the requirements surrounded by `{{#requirements}}` tags. Indentation matters. During the requirements section, only some special partials and helpers can be used. Markdown is allowed. Use caution because each line is processed separately. Multi-line markdown, partials, and helpers will cause issues in the display of the requirements.

    {{#requirements}}
    1. Do the following:
        Follow-up paragraph for requirement 1.
        (a) This is a sub-requirement.
            Follow-up paragraph for 1A.
    {{/requirements}}

Within the requirements, only these partials and helpers are allowed.

* `{{#note type="inPerson" type2="online"}}This is a note{{/note}}` - Adds a note to the requirements. The `type` attribute will make the note hidden unless the requirements are for that type of class. The attribute `type2` is optional. Allowed types are `inPerson` and `online`.


Merit Badge Workbooks
---------------------

A special section can be added between requirements. This has minimal formatting and needs more care to use.

    {{#wb-special class="W(50%) Mx(a)"}}
        This is a special section that takes up half of the width of the page.
        The `class` attribute is optional.
    {{/wb-special}}

Workbooks must wrap all requirements in `{{#wb-req}}` tags.

    {{#wb-req item="1A" requirement="Make workbooks great again"}}
    {{/wb-req}}

    {{#wb-req item="1B" requirement="Very dangerous thing" alert="Scouts need to be careful"}}
    {{/wb-req}}

Within the `{{#wb-req}}` tags, page breaks are avoided. Authors may use any of these.

* `{{>wb-req-allow-break}}` - Inserts an area within `{{#wb-req}}` tags to allow the workbook to split at the location for a page break.

* `{{#wb-req-area class="P(2em)"}}...{{/wb-req-area}}` - Makes a special area for custom content in a workbook requirement.

* `{{#wb-req-cell class="Pt(1em)"}}...{{/wb-req-cell}}` - Wraps content into a single cell. Useful for splitting up a line into multiple horizontal cells.

* `{{#wb-req-cells}}...{{/wb-req-cells}}` - Creates a container and balances out the width of all `{{#wb-req-cell}}` tags onto a single line.

* `{{#wb-req-counselor}}...{{/wb-req-counselor}}` - Standardized note indicating that the requirement must be done with your merit badge counselor. When content is placed within the tags, it is placed below the standardized message.

* `{{#wb-req-header}}...{{/wb-req-header}}` - Shows a header in a box with a lighter green background. The content becomes the text in the box.

* `{{#wb-req-line}}...{{/wb-req-line}}` - A single-line input field. If content is within the tag, it is placed to the left of the input area.

* `{{#wb-req-note}}...{{/wb-req-note}}` - A wrapped note, suitable for displaying within the requirements.

* `{{#wb-req-text lines=3}}...{{/wb-req-text}}` - A multi-line text area. Any content within the tag is placed above the text area.

* `{{>wb-req-table col="Column 1" col2="Column 2" ... row="Label 1" row2="Label 2" ...}}` - Show a table in a workbook. Specify the number of columns and rows. Currently supports up to 19 columns and 39 rows.

* `{{>wb-req-table-row}}` - Content for a single row within `{{>wb-req-table}}`.

* `{{>wb-signature signator="Counselor" checkbox="Approved"}}` - Show a signature form that's for a person (Counselor, Parent, etc.) and the checkbox indicates that the requirement was approved, created, discussed, or another action to meet the requirement.
