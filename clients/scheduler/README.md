# Canvas - Embed Scheduler

## CDN Installation

- Add a host container

```
<div id="embed-root"></div>
```

- Add CDN Link to your application

```
<script src="https://d1avuomfq0werr.cloudfront.net/scheduler.js" type="text/javascript"></script>
```

- Add a script tag to initialize application

```
<script type="text/javascript">
  Scheduler.init({
    api: https://your.api.url,
    appointmentTypeCode: '8675309',
    bailoutURL: https://your.host.site,  // Return user here if they exit early
    duration: 20,
    locationId: 'someID',
    patientId: 'someID',
    patientKey: 'someKey',
    providers: [
      {
        id: 'someID',
        name: 'Some Provider, MD.'
      },
      {
        id: 'someID',
        name: 'Some Provider, MD.'
      }
    ],
    reason: 'some reason for appointment,
    returnURL: https://your.host.site/done, // Send user here when they finish
    rootId: 'embed-root',  // The id of your host container
    brandColor: '#000000',  // Your custom brand color in hex code
    accentColor: '#000000,  // Your custom accent color in hex code
  })
</script>
```

## NPM Installation

> Coming soon
