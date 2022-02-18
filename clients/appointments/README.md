# Canvas - Embed Appointments

## CDN Installation

- Add a host container

```
<div id="embed-root"></div>
```

- Add CDN Link to your application

```
<script src="https://d2nowqpv63va0r.cloudfront.net/appointments.js" type="text/javascript"></script>
```

- Add a script tag to initialize application

```
<script type="text/javascript">
  Appointments.init({
    api: https://your.api.url,
    bailoutURL: https://your.host.site,  // Return user here if they exit early
    locationId: 'someID',
    patientId: 'someID',
    patientKey: 'someKey',
    rootId: 'embed-root',  // The id of your host container
    brandColor: '#000000',  // Your custom brand color in hex code
    accentColor: '#000000,  // Your custom accent color in hex code
  })
</script>
```

## NPM Installation

### Install with prefered package manager

```
  npm i @canvas-medical/embed-appointments --save
```

```
  yarn add @canvas-medical/embed-appointments
```

### Initialize embeds

- Add a host container

```
<div id="embed-root"></div>
```

- Import the initializer

```

import { init } from '@canvas-medical/embed-appointments'

```

- Call the initializer and supply it some config

```
  init({
    api: https://your.api.url,
    bailoutURL: 'https://your.host.site',  // Return user here if they exit early
    locationId: 'someID',
    patientId: 'someID',
    patientKey: 'someKey',
    rootId: 'embed-root',  // The id of your host container
    brandColor: '#000000',  // Your custom brand color in hex code
    accentColor: '#000000,  // Your custom accent color in hex code
  })
```

### React Example

```
import React, { useEffect } from 'react'
import { init } from '@canvas-medical/embed-appointments'

export const Appointments = (props) => {
  useEffect(() => {
    init({
      api: https://your.api.url,
      bailoutURL: 'https://your.host.site',  // Return user here if they exit early
      locationId: 'someID',
      patientId: 'someID',
      patientKey: 'someKey',
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
