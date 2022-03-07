## Getting Started

### Requirements:

- [Node v16](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/)

### Install Dependencies

- Run `yarn` from `./clients`. This will install dependencies for all three packages.

### Starting Applications

- Appointments: `yarn workspace @canvas-medical/embed-appointments start`
- Scheduler: `yarn workspace @canvas-medical/embed-scheduler start`

### Testing Applications

- Appointments: `yarn workspace @canvas-medical/embed-appointments test`
- Common: `yarn workspace @canvas-medical/embed-common test`
- Scheduler: `yarn workspace @canvas-medical/embed-scheduler test`

New tests should be added to each packages' `./tests` directory.
