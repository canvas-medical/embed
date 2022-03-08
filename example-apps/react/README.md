# Sample Patient Scheduling and Appointment Viewing App in React

> ✨ Bootstrapped with Create Snowpack App (CSA).

Need a little help getting started? Take a look at the structure of this app to see how the embeds can help speed up your patient app development time.

This react app provides a simple demonstration on how the [@canvas-medical/embed-scheduler](https://www.npmjs.com/package/@canvas-medical/embed-scheduler) and the [@canvas-medical/embed-appointments](https://www.npmjs.com/package/@canvas-medical/embed-appointments) can be used independently in any application.

_A note about proxy_ - the scheduler and appointment packages require a `patient_key` on `init`. This repo uses a temporary proxy that is used to return a `patient_key` from the Canvas Medical API. This is demonstrated in [App.jsx](https://github.com/canvas-medical/embed/blob/dedbd366831a40fee9df235cbfe474bd87410ef8/example-apps/react/src/App.jsx#L33-L40).
We are working on a long-term solution that will involve patient-scoped OAuth tokens rather than a proxy app.

Get your [proxy up and running locally](https://github.com/canvas-medical/embed/blob/main/proxy/README.md#local-development) to test out this example app against `http://localhost:3000/`

#### Config Set Up

Edit the [App.jsx config](https://github.com/canvas-medical/embed/blob/fce05737573b308edfc732204990e0ef8ac226c7/example-apps/react/src/App.jsx#L11) to contain `patientId` and `providerIds` from your instance.
The easiest way to get a `patientId` to test is to navigate to a patient and copy the id in the url
![](static/example_content/patient_id_example.png)

You can get `provider_ids` by scheduling a few appointments with a provider (through the 'New note' button seen above). Then navigate to `https://{yourInstance}.canvasmedical.com/api/PatientProtocolInput/{patientId}/`. Search for `upcomingAppointmentNotes` and grab the `key` in `providerDisplay`.

This is what you should expect when running this example app.

#### Authentication

Enter any username and password, this will pass a default `patient_key` over to scheduling and appointments.

#### Scheduling

- Find available provider appointment slots by date
- Select a time and schedule default visit with a selected provider
- On appointment confirmation, redirect to any page (default set to canvasmedical.com)

![](static/example_content/scheduler.png)

#### Appointments

- View current appointments
- Cancel selected appointment

![](static/example_content/appointments.png)

## Available Scripts

### npm start

Runs the app in the development mode.
Open http://localhost:8080 to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### npm run build

Builds a static copy of your site to the `build/` folder.
Your app is ready to be deployed!

**For the best production performance:** Add a build bundler plugin like "@snowpack/plugin-webpack" to your `snowpack.config.mjs` config file.

### npm test

Launches the application test runner.
Run with the `--watch` flag (`npm test -- --watch`) to run in interactive watch mode.
