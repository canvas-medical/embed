export const isEarliestDateOrBefore = (
  date: Date,
  startDate: Date | null
): boolean => {
  const earliestDate = startDate || new Date()

  return (
    date.getFullYear() < earliestDate.getFullYear() ||
    (date.getFullYear() === earliestDate.getFullYear() &&
      date.getMonth() < earliestDate.getMonth()) ||
    (date.getFullYear() === earliestDate.getFullYear() &&
      date.getMonth() === earliestDate.getMonth() &&
      date.getDate() <= earliestDate.getDate())
  )
}

export const scrollDateBack = (
  date: Date,
  setter: Function,
  startDate: Date | null
): void => {
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate() - 1

  const newDate = new Date(year, month, day)

  if (isEarliestDateOrBefore(newDate, startDate)) {
    setter(startDate || new Date())
  } else {
    setter(new Date(year, month, day))
  }
}

export const scrollDateForward = (
  date: Date,
  setter: Function,
  startDate: Date | null
): void => {
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate() + 1

  const newDate = new Date(year, month, day)

  if (isEarliestDateOrBefore(newDate, startDate)) {
    setter(startDate || new Date())
  } else {
    setter(new Date(year, month, day))
  }
}

export const userTimezone = new Date()
  .toLocaleTimeString('en-us', { timeZoneName: 'short' })
  .split(' ')[2]
