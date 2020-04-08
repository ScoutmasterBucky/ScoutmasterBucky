The following metadata fields are used by page templates:

* `layout`: The layout file that should be wrapped around the content. If empty or invalid, no layout is applied.
* `link`: Function to help create links between page objects.
* `site`: Object populated from the `metadata.json` file.
    * `site.buildDate`: Current date object when the site was built.
    * `site.owner`: Name of site owner.
    * `site.ownerEmail`: Email address of site owner.
    * `site.title`: Title of the site. What someone uses to refer to the site as a whole.
    * `site.url`: URL to the main page of the site.
    * `site.urlToRoot`: URL to the root of the site from within the site.
* `title`: The title of the web page.

Events have additional standard metadata:

* `host`: Who is putting on the event. Typically "Scoutmaster Bucky"
* `title`: The event title
* `eventDate`: When the event is held (single day). See date notes.
* `startDate`: When the event starts (multiple days). See date notes.
* `endDate`: When the event is done (multiple days). See date notes.
* `location`: Array of strings to describe the address where the event is held.

Dates in the file's metadata must be quoted as strings, otherwise they will be interpreted as UTC. All dates are processed as CST6CDT.
