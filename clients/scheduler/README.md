# Canvas - Embed Scheduler

<details>
<summary><b>CDN Installation</b></summary>

- Add a host container

```
<div id="embed-root"></div>
```

- Add CDN Link to your application

```
<script src="https://d1a32bn8n735rs.cloudfront.net/scheduler.js" type="text/javascript"></script>
```

- Add a script tag to initialize application

```
<script type="text/javascript">
  Scheduler.init({
    api: https://your.api.url,
    appointmentCoding: {
      system: 'https://coding.system',
      code: '8675309',
      display: 'Some display'
    }
    bailoutURL: 'https://your.host.site',  // Return user here if they exit early
    duration: 20,
    locationId: 'someID',
    patientId: 'someID',
    patientKey: 'someKey',
    providerIds: [
      'someID',
      'someOtherID',
    ],
    description: 'some description for appointment,
    returnURL: 'https://your.host.site/done', // Send user here when they finish
    rootId: 'embed-root',  // The id of your host container
    brandColor: '#000000',  // Your custom brand color in hex code
    accentColor: '#000000,  // Your custom accent color in hex code
    fontFamily: "'my font', serif",  // Your custom font. See below.
  })
</script>
```

### Available CDN Versions

V1: https://d1a32bn8n735rs.cloudfront.net/scheduler.js

</details>

<details>
<summary><b>NPM Installation</b></summary>

### Install with preferred package manager

```
  npm i @canvas-medical/embed-scheduler --save
```

```
  yarn add @canvas-medical/embed-scheduler
```

### Initialize embeds

- Add a host container

```
<div id="embed-root"></div>
```

- Import the initializer

```

import { init } from '@canvas-medical/embed-scheduler'

```

- Call the initializer and supply it some config

```
  init({
    api: https://your.api.url,
    appointmentCoding: {
      system: 'https://coding.system',
      code: 'some code',
      display: 'corresponding display text'
    }
    bailoutURL: 'https://your.host.site',  // Return user here if they exit early
    duration: 20,
    locationId: 'someID',
    patientId: 'someID',
    patientKey: 'someKey',
    providerIds: [
      'someID',
      'someOtherID',
    ],
    description: 'some description for appointment,
    returnURL: 'https://your.host.site/done', // Send user here when they finish
    rootId: 'embed-root',   // The id of your host container
    brandColor: '#000000',  // Your custom brand color in hex code
    accentColor: '#000000,  // Your custom accent color in hex code
    fontFamily: "'my font', serif",  // Your custom font. See below.
  })
```

</details>

# Important Note About Fonts

These embeds rely on the shadow DOM to encapsulate their styles from the host application's styles. As a result, you need to do a bit of extra work to get custom fonts working.

To add your font, either link it in your document head or add an `@import` statement to your document's CSS or a style tag.

The embed uses 400 and 700 weights, so make sure your font import includes at least both of those.

Link Example

```
  <head>
    <meta charset="utf-8" />
    <title>My Application</title>
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <style>
      body {
        margin: 0;
        overflow: hidden;
      }
    </style>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
  </head>
```

Import Example

```
  <head>
    <meta charset="utf-8" />
    <title>My Application</title>
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

      body {
        margin: 0;
        overflow: hidden;
      }
    </style>
  </head>
```

Once you have imported your font, you can provide its name to the `customFont` parameter in the initializer.

We recommend using [Roboto](https://fonts.google.com/specimen/Roboto) as your default font. If you use Roboto, you don't need to provide a `customFont` parameter to the initializer.

## React Example

`Scheduler.jsx`

```
import React, { useEffect } from 'react'
import { init } from '@canvas-medical/embed-scheduler'

export const Scheduler = (props) => {
  useEffect(() => {
    init({
      api: https://your.api.url,
      appointmentCoding: {
        system: 'https://coding.system',
        code: '8675309',
        display: 'Some display'
      }
      bailoutURL: 'https://your.host.site',  // Return user here if they exit early
      duration: 20,
      locationId: 'someID',
      patientId: 'someID',
      patientKey: 'someKey',
      providerIds: [
        'someID',
        'someOtherID',
      ],
      description: 'some description for appointment,
      returnURL: 'https://your.host.site/done', // Send user here when they finish
      rootId: 'embed-root',  // The id of your host container
      brandColor: '#000000',  // Your custom brand color in hex code
      accentColor: '#000000,  // Your custom accent color in hex code
    })
  }, [])

  return (
    <div id="embed-root" />
  )
}
```
