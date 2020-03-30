The following metadata fields are used by templates:

* `layout`: The layout file that should be wrapped around the content. If empty or invalid, no layout is applied.
* `link`: Function to help create links between page objects.
* `site`: Object populated from the `metadata.json` file.
    * `site.buildDay`: Current day when the site was built.
    * `site.buildMonth`: Current month when the site was built.
    * `site.buildYear`: Current year when the site was built.
    * `site.owner`: Name of site owner.
    * `site.ownerEmail`: Email address of site owner.
    * `site.title`: Title of the site. What someone uses to refer to the site as a whole.
    * `site.url`: URL to the main page of the site.
    * `site.urlToRoot`: URL to the root of the site from within the site.
* `title`: The title of the web page.
