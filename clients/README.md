# Canvas Self-Scheduling Embeds

## The Embeds

There are three packages within the `clients` directory - `appointments`, `common`, and `scheduler`.

- [appointments](./appointments/README.md) handles the display and management of a patient's appointments.
- [common](./common/README.md) handles shared business logic and components, and is a dependency of both `appointments` and `scheduler`.
- [scheduler](./scheduler/README.md) handles scheduling of a patient's appointments.

These three packages are managed with [yarn workspaces](https://yarnpkg.com/features/workspaces). While developing and building, yarn will use the live code from `common` in `appointments` and `scheduler` so long as the version number of `common` matches the version required in the other packages.

This leads to a seemless developer experience, allowing you to easily edit any files in any package and see the results immediately.

## [Getting Started](./documentation/getting-started.md)

See requirements and basic commands to get started working on these embeds.

## [Dependencies](./documentation/dependencies.md)

See a list of dependencies used in the embeds.

## Installing

[Scheduler](./scheduler/README.md)
[Appointments](./appointments/README.md)
