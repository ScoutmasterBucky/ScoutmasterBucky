# ScoutmasterBucky.com Web Site


## Building

First, get the prerequisites.

    npm install

Next, you simply run the `build` script.

    npm run build

Live server.

    npm run start


## Events

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
* `meritBadge` - If `true`, uses the merit badge event colors and template. This is for a Scoutmaster Bucky merit badge event, not an outside event.
* `online` - If `true`, uses the online event colors and template. This is for a Scoutmaster Bucky online event, not an outside event.
* `onSaleDate` - If set, this will show "Tickets go on sale MMMM D, YYYY" as long as that day is in the future.
* `eventBriteEventId` - For the generation of the registration link. Used for online events only.
* `registrationLink` - When there is a link to a registration page, set this property and a "Register Here" button will automatically be added to the end.
* `icon` - Image to show in association in the event card.


## Merit Badge Requirements

Merit badge requirements are stored in `src/data/merit-badges/*/requirements.yaml`.

The file is a list of these types of items - let's call them "Requirement List
Items":

* Detail
* Requirement


### Detail

Adds text between requirements that look like just another paragraph. Useful
for separators, headings, and additional information that isn't a requirement.

```
- detail: true
  text: |-
      This is HTML content. You can <b>bold</b> or do other HTML-related things.
```

Properties:

* `detail`: Must be `true`
* `text`: HTML to display


### Requirement

Lists a requirement, which may have child requirements.

```
- requirement: 1
  text: |-
      Do <b>ONE</b> of the following:
```

Shows this one requirement.

```
- requirement: 2
  text: |-
      Showing how to use children
  children:
      - requirement: a
        text: |-
            Children can be requirements or any other type of object allowed at
            the top-level of the file, such as a note or callout.
      - requirement: b
        text: |-
            Children can have their own children.
        children:
            - detail: true
              text: |-
                  This message is for "requirement 2 b"
      - detail: true
        text: |-
            A note for "requirement 2"
```

This illustrates how notes and children can be added. Children can be any type
of "Requirement List Item."

Merit badge requirements can also have resources associated with them.

```
- requirement: 3
  text: |-
      This requirement has resources.
  resources:
      - href: https://youtu.be/dQw4w9WgXcQ
        text: Video on how to do the requirement
        type: video
      - href: https://en.wikipedia.org/wiki/Merit_badge
        text: Wikipedia article on merit badges
        type: website
```

Requirement types that are currently accepted are pdf, podcast, video, website, and website with videos.

Properties:

* `children`: Optional, list of "Requirement List Items"
* `requirement`: The number or letter of the requirement
* `resources`: Optional, list of resources to display
* `text`: HTML to display


Data Validation
---------------

YAML files and JSON data are both vetted against a schema to ensure proper parsing and that there's no structural errors. When it does not validate, an error message can be seen. Here is the top of a sample error.

```
Error: Error in data file: merit-badges/bird-study/index.md
    /4/children/0: must have required property 'requirement'
    /4/children/0: must have required property 'detail'
    /4/children/0: must match exactly one schema in oneOf
```

There are two important things to notice. First, this indicates that this is for the Bird Study merit badge. Most likely that means the error applies to `requirements.yaml` that builds the merit badge. The second important thing is the `/4/children/0` part. It will tell you how far the parsing worked until it found an error.

Programmers start counting at 0. Sorry. That's just the way it is, but it is an important thing to remember when counting. When looking at the Bird Study requirements file, we will look for the **sixth** item in the list. The number displayed in the error comes from a library and it's not easy to just increment it by one for human consumption.

* First item (index 0) is requirement 1
* Second item (index 1) is requirement 2
* Third item (index 2) is requirement 3
* Fourth item (index 3) is requirement 4
* Fifth item (index 4) is requirement 5

That requirement has children, and the first item (number 0) in that list has a problem. In my example it turned out that I had a typo in a property name.

This doesn't tell you how to fix it, but does help find and locate the errors.
