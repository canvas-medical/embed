import { toISOString } from './format'

// Takes two Date objects and determines if they are the same day.
export const isSameDay = (queryDate: Date, currentDate: Date) => {
  return (
    queryDate.toISOString().slice(0, 10) ===
    currentDate.toISOString().slice(0, 10)
  )
}

export const checkDateTimeMatch = (a: string, b: string) => {
  return toISOString(a) === toISOString(b)
}
