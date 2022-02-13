export const isToday = (date: Date): boolean => {
  const today = new Date()

  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  )
}

export const scrollDateBack = (date: Date, setter: Function): void => {
  if (isToday(date)) {
    setter(new Date())
  } else {
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate() - 1

    setter(new Date(year, month, day))
  }
}

export const scrollDateForward = (date: Date, setter: Function): void => {
  if (isToday(date)) {
    setter(new Date())
  } else {
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate() - 1

    setter(new Date(year, month, day))
  }
}

export const userTimezone = new Date()
  .toLocaleTimeString('en-us', { timeZoneName: 'short' })
  .split(' ')[2]
