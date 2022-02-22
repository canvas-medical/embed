# Canvas Embed

## [Clients](./clients/README.md)

## [Proxy](./proxy/README.md)

### Fetching a Patient Key
*The proxy is a temporary measure to be used until a patient-scoped OAuth token is implemented on the FHIR API.*

To fetch a patient key, make a GET request to the Auth endpoint of your proxy API.

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
