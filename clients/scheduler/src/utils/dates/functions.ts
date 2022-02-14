export const isTodayOrBefore = (date: Date): boolean => {
  const today = new Date()

  return (
    date.getDate() <= today.getDate() &&
    date.getMonth() <= today.getMonth() &&
    date.getFullYear() <= today.getFullYear()
  )
}

export const scrollDateBack = (date: Date, setter: Function): void => {
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate() - 1

  const newDate = new Date(year, month, day)

  if (isTodayOrBefore(newDate)) {
    setter(new Date())
  } else {
    setter(new Date(year, month, day))
  }
}

export const scrollDateForward = (date: Date, setter: Function): void => {
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate() + 1

  const newDate = new Date(year, month, day)

  if (isTodayOrBefore(newDate)) {
    setter(new Date())
  } else {
    setter(new Date(year, month, day))
  }
}

export const userTimezone = new Date()
  .toLocaleTimeString('en-us', { timeZoneName: 'short' })
  .split(' ')[2]
