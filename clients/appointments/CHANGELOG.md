# Changelog

## [0.1.7] - 2022-09-26

### Added

- Added `ics` and `date-and-time` packages
- logic for adding ics file when add to calendar button clicked

### Changed

- Updated `onAddToCalendar` function to target appointment clicked
- Updated appointment `duration` in minutes

## [0.1.8] - 2022-09-26

### Changed

- Updated appointment address to be an `<a>` tag with `href` to goolge maps link

## [0.1.9] - 2022-09-27

### Changed

- Updated ics attendee to have default `name` and `email`

## [0.1.10] - 2022-10-05

### Changed

- Removed `locationId` prop from Appointments embed
- Added support for a `locationMap` prop to provide multiple location titles, addresses, and URL's
- Determines location data by API response rather than passed `locationId`

## [0.1.11] - 2023-01-17

### Changed

- Updated text on "No Appointments" page

## [0.1.12] - 2023-03-21

### Changed

- Update appointment `put` body

## [0.1.13] - 2023-03-21

### Changed

- Bump @canvas-medical/embed-common to v0.1.8
