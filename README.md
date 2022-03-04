# Canvas Embed

This repository provides a quick add on to allow patients to manage their scheduling and appointments.

It is comprised of the following two main sections:

### [Clients](./clients/README.md)

### [Proxy](./proxy/README.md)

:construction: _The proxy is a temporary measure to be used until a patient-scoped OAuth token is implemented on the Canvas Medical FHIR API._ :construction:

Its primary purpose is to handle the OAuth authentication for the JS embedded widgets (aka the embeds) when communicating with the FHIR API. This authentication process should contain a `patient_key` in its response. This `patient_key` is required to interact with [the embeds](https://github.com/canvas-medical/embed/tree/main/clients).

The following is an example of how to fetch a `patient_key` by making a `GET` request to the Auth endpoint of your proxy API.

_Javascript Example_

```
fetch(`${apiURL}/Auth?key=${apiKey}&patient=${patientId}`)
  .then((response) => response.json())
  .then((data) => {
    if (data.patient_key) {
      // Pass the patient_key into some state variable or directly into the initializer
    } else {
      console.error("Patient not found")
    }
  })
```

This fetch example is found in both the [example-apps/react](https://github.com/canvas-medical/embed/blob/26021a090dd6181e376ad47823b046e708274909/example-apps/react/src/App.jsx#L31-L41) and the [example-apps/static](https://github.com/canvas-medical/embed/blob/26021a090dd6181e376ad47823b046e708274909/example-apps/static/script.js#L51-L59)

## Getting Started

Fork this repo and then clone the fork

Start by navigating to `/example-apps/`, installing the selected app dependencies, and running the app. Running an example app will give you a better understanding of how the embeds can run in your custom application. The [React app](https://github.com/canvas-medical/embed/blob/main/example-apps/react/README.md) has helpful documentation on how to make use of embeds.

Make sure to read through the [Proxy](./proxy/README.md) documentation to deploy your own proxy app.

If you would like to contribute, make sure to read our [Contributing Guidelines](https://github.com/canvas-medical/embed/blob/main/CONTRIBUTING.md) and [Code of Conduct](https://github.com/canvas-medical/embed/blob/main/CODE_OF_CONDUCT.md). Then head over to the [Getting Started](https://github.com/canvas-medical/embed/blob/main/clients/documentation/getting-started.md) documentation for more instructions
