# Changelog

## [0.0.10] - 2022-05-11

### Added

- Added a `daysToFetch` prop with a default value of 7
- Support bulk fetching of time slots

### Changed

- Paginate via previously loaded (locally stored) time slots instead of fetching new time slots each time the date updates

## [0.0.11] - 2022-05-12

### Fixed

- Fixed a bug that prevented `maxDate` from being stored when 1 or more providers has no time slots

## [0.0.12] - 2022-05-17

### Added

- On initial scheduler load, set (skip) date to the date of the first available time slot

## [0.0.13] - 2022-05-25

### Added

- Past appointments and appointments within an hour cannot be booked
- Removed Calendar Icon in favor of Dropdown Icon

## [0.0.14] - 2022-05-31

### Added

- Calendar dates with no available slots are disabled

### Changed

- Appointments within `appointmentBufferInMintues` cannot be booked instead of previously fixed 1 hour

### Fixed

- Fixed a bug that allowed first available time slot to be in the past

## [0.0.15] - 2022-06-13

### Added

- Added additional callbacks to Scheduler interface
- Called callbacks across time-select, date-select, confirm-appointment components
- Added auth & callbacks to `src/index.html` to make future setup easier

### Changed

- Called error callbacks in `app-context`

## [0.1.1] - 2022-07-13

### Added

- Version num to test installing tags from main vs branches

## [0.1.2] - 2022-07-25

### Added

- Added callback for when the scheduler timeslots load

## [0.1.7] - 2022-08-04

### Added

- Updated the `resetTimeslot` function to reset preload booking data too

## [0.1.10] - 2022-08-30

### Changed

- Fixed typos in the calendar (November and December)

## [0.1.11] - 2022-09-01

### Changed

- Prevented calling the onDateChange callback when there are no timeslots available

## [0.1.12] - 2022-09-06

### Changed

- Updated to reset preloaded booking info if a user cancels instead of confirming

## [0.1.13] - 2022-09-06

### Changed

- Fixed regression from 0.1.11, ensured dateChange events always fire

## [0.1.14] - 2022-09-14

### Changed

- Fixed regression from 0.1.11, ensured dateChange events contain correct isFirstDateViewed property
- added datesViewed property to segment dateChange callback

## [0.1.15] - 2022-10-24

### Changed

- Updated onClickOverride method to be more generic, applied to appointment confirmation

## [0.1.17] - 2022-12-21

### Added

- Added `sortProviders` to allow providers to be sorted by the number of available time slots they have per day

## [0.1.18] - 2023-03-20

### Added

- Fix for race condition on scheduler slot load

## [0.1.19] - 2023-03-20

### Added

- Include appointment ID in body when cancelling, needed for caching work
