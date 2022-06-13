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

