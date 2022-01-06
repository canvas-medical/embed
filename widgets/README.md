# Widgets

## About

There are three packages within managed with [yarn workspaces](https://yarnpkg.com/features/workspaces)

**scheduler** contains the self-scheduling embed.

**appointments** contains the appointment view and cancelation embed.

**common** contains the shared styles and components.

---

## `appointments` embed

You can interact with the `appointments` embed from either this directory (`/widgets`) or from its directory (`/widgets/packages/appointments`).

### From `/widgets`

- Install: `yarn workspace @canvas/appointments install`
- Launch Dev Server: `yarn workspace @canvas/appointments dev`
- Build: `yarn workspace @canvas/appointments build`

### From `/appointments`

- Install: `yarn install`
- Launch Dev Server: `yarn dev`
- Build: `yarn build`
