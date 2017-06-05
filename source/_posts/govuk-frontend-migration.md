title: 'Migrating a GOV.UK format to a new frontend'
tags:
  - gds
categories:
  - projects
date: 2016-12-22
---

In 2016 I've been migrating formats from one frontend to another. This is an overview of that process.

GOV.UK has been focused on [rebuilding publishing tools](https://insidegovuk.blog.gov.uk/2015/10/27/rebuilding-gov-uks-publishing-tools/), aiming to consolidate them into a coherent platform. Applications were [built in isolation](https://insidegovuk.blog.gov.uk/2016/04/21/rebuilding-gov-uks-publishing-platform-an-update/), for specific user needs, eg travel advice. This led to many similar applications doing the same thing differently. On the frontend it meant similar but slightly different pages.

The [publishing platform](https://gdstechnology.blog.gov.uk/2016/07/08/introducing-the-gov-uk-publishing-platform-in-detail/) solves this problem with a common API for publishing and rendering content across all applications. We write functionality once and use it everywhere.

GOV.UK publishing tools are typically in two halves: a backend app where content designers create and edit content, and a frontend app which renders content for the public. We have about 20 frontend apps, [which we are consolidating](https://insidegovuk.blog.gov.uk/2016/12/07/consolidating-our-content-templates/).

## Whitehall

[Whitehall](https://github.com/alphagov/whitehall) is the application responsible for publishing and rendering all content under the `/government` path. It’s a monolith and an exception to the rule. It’s responsible for things like the budget and the national curriculum. It handles formats like consultations, statistics, all department news, speeches, policies, and a whole lot more. It was built quickly to meet many user needs and has organically grown to become unwieldy.

## government-frontend

I've been in the "Core formats" team, we’re responsible for migrating all of Whitehall’s formats to the publishing platform. When migrated, content written in Whitehall is sent to the publishing platform, from there a separate frontend app consumes a "content item" (a JSON representation of the content), and renders it. That application is [government-frontend](github.com/alphagov/government-frontend/).

Format by format we've been moving the frontend out of Whitehall and into government-frontend.

## Defining a format

What is sent to and retrieved from the publishing platform is defined by [JSON content schemas](https://github.com/alphagov/govuk-content-schemas). For a format, eg speeches, we [define attributes specific to speeches](https://github.com/alphagov/govuk-content-schemas/blob/master/formats/speech/publisher/details.json) – like where the speech was given, when it was given and the body of the speech.

```json
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "type": "object",
  "additionalProperties": false,
    "required": [
      "body",
      "delivered_on"
    ],
  "properties": {
    "body": {
      "type": "string"
    },
    "location": {
      "type": "string"
    },
    "delivered_on": {
      "type": "string",
      "format": "date-time"
    },
    …
  }
}
```

We also define other content types the format is connected to. The speech is given by a person or speaker, it might be about a policy. These connections are called [links](https://github.com/alphagov/govuk-content-schemas/blob/master/formats/speech/publisher/links.json).

```json
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "speaker": {
      "description": "A speaker that has a GOV.UK profile",
      "$ref": "#/definitions/guid_list",
      "maxItems": 1
    },
    "policies": {
      "$ref": "#/definitions/guid_list"
    },
    …
  }
}
```

## Using examples to build the frontend

Using the schema we can build example content items. These samples of JSON are based on live content and are representative of what the frontend application will consume when the format is migrated. [This example of a speech](https://github.com/alphagov/govuk-content-schemas/blob/master/formats/speech/frontend/examples/speech.json) is based on [a speech about gender imbalance in the nuclear industry](https://www.gov.uk/government/speeches/andrea-leadsoms-speech-at-women-in-nuclear-uk-conference).

Using a set of examples the frontend for a format can be built. This [pull request](https://github.com/alphagov/government-frontend/pull/215) allows government-frontend to render speeches. The pull request is comprised of:

* a presenter for handling the JSON content item of a speech
* a template to render the speech
* a stylesheet for speech specific styles
* a unit test for the presenter
* an integration test for the presenter and view

### A rendered example

{% figure govuk-speech-example.png portrait %}
Speech example rendered by government-frontend at a desktop viewport width
{% endfigure %}

### Finishing migration

Migration continues on the backend. Whitehall is updated to send content to the publishing platform. This can be a complex process depending on the intricacy of the format. When complete, all content for a given format is published through the new pipeline and rendered by government-frontend.

The therapeutic last step is to delete the old template, styles and tests from Whitehall. For example this pull request [deleting the frontend for policy groups](https://github.com/alphagov/whitehall/pull/2526/files).
