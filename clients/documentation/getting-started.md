## Getting Started

### Requirements:

- [Node v16](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/)

### Install Dependencies

- Run `yarn` from `./clients`. This will install dependencies for all three packages.

### Starting Applications

- Appointments: `yarn workspace @canvas-medical/embed-appointments start`
- Scheduler: `yarn workspace @canvas-medical/embed-scheduler start`

### Building and Deploying Applications

_You should never need to build `common` since it is a dependency of the other packages_

1. Build appointments: `yarn workspace @canvas-medical/embed-appointments build`
2. Build scheduler: `yarn workspace @canvas-medical/embed-scheduler build`
3. Upload resulting `appointments.js`, `appointments.js.map`, `scheduler.js`, and `scheduler.js.map` to appropriate S3 bucket.
4. Invalidate appropriate Cloudfront distribution's cache.

### Testing Applications

- Appointments: `yarn workspace @canvas-medical/embed-appointments test`
- Common: `yarn workspace @canvas-medical/embed-common test`
- Scheduler: `yarn workspace @canvas-medical/embed-scheduler test`

New tests should be added to each packages' `./tests` directory.

### Publishing Applications

Ideally, publishing should always happen through GitHub Actions, but there are some manual changes you'll need to make whenever you publish a new version.

1. Determine new version number. You'll supply this to `yarn publish` later.
2. In `./clients/appointments/package.json` udpate `@canvas-medical/embed-common` to the new version number.
3. In `./clients/scheduler/package.json` udpate `@canvas-medical/embed-common` to the new version number.
4. `yarn workspace @canvas-medical/embed-common publish`. Input new version number when prompted.
5. `yarn workspace @canvas-medical/embed-appointments publish`. Input new version number when prompted.
6. `yarn workspace @canvas-medical/embed-scheduler publish`. Input new version number when prompted.

**It's important to keep the version number of `common` in sync in each dependency.**  
If they are out of sync, yarn will install the version designated in each `package.json` from NPM instead of using local code.
