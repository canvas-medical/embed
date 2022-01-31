const monthStrings = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'Novemeber',
  'Decemeber',
]

function isLeapYear(date) {
  const year = date.getFullYear()

  return !(year % 4 || (!(year % 100) && year % 400))
}

function getDaysInMonth(date) {
  const leapYear = isLeapYear(date)
  const month = date.getMonth()

  // getMonth() returns zero indexed month, so each month is the normal month number - 1
  // I.E. January is 0, February is 1, March is 2, etc.
  switch (month) {
    case 1:
      if (leapYear) {
        return 29
      }
      return 28
    case 3:
    case 5:
    case 8:
    case 10:
      return 30
    default:
      return 31
  }
}

function getDateString(year, month, day) {
  return new Date(year, month, day).toDateString()
}

export function generateDays(date) {
  const year = date.getFullYear()
  const month = date.getMonth()
  const daysInMonth = getDaysInMonth(date)
  const today = new Date()
  const days = []

  for (let i = 1; i < daysInMonth + 1; i++) {
    if (
      i < today.getDate() &&
      month <= today.getMonth() &&
      year <= today.getFullYear()
    ) {
      days.push({
        date: i,
        disabled: true,
        dateString: getDateString(year, month, i),
      })
    } else {
      days.push({
        date: i,
        disabled: false,
        dateString: getDateString(year, month, i),
      })
    }
  }

  return days
}

// Generates an array of "skip days" to place the first day of the month
// on the right day of the week
export function getSkipDays(date) {
  const year = date.getFullYear()
  const month = date.getMonth()

  const firstDay = new Date(year, month, 1).getDay()
  const skipppedDays = []
  for (let i = 0; i < firstDay; i++) {
    skipppedDays.push(i)
  }

  return skipppedDays
}

export function getMonthAndYearString(date) {
  const year = date.getFullYear()
  const month = date.getMonth()

  return `${monthStrings[month]} ${year}`
}

export function getMonthAndYearOptions(date) {
  const year = date.getFullYear()
  const startMonth = date.getMonth()
  const months = []

  for (let i = 0; i < 12; i++) {
    if (startMonth + i > 11) {
      months.push({
        string: `${monthStrings[startMonth + i - 12]} ${year + 1}`,
        date: new Date(year + 1, startMonth + i - 12, 1),
      })
    } else {
      months.push({
        string: `${monthStrings[startMonth + i]} ${year}`,
        date: new Date(year, startMonth + i, 1),
      })
    }
  }

  return months
}

export function getNextMonth(date) {
  const month = date.getMonth()
  const year = date.getFullYear()

  if (month === 11) {
    return new Date(year + 1, 0, 1)
  }

  return new Date(year, month + 1, 1)
}

export function getPreviousMonth(date) {
  const today = new Date()
  const month = date.getMonth()
  const year = date.getFullYear()

  if (month === 0) {
    if (today.getFullYear() === year - 1 && today.getMonth === 11) {
      return new Date(year - 1, 11, today.getDate())
    }
    return new Date(year - 1, 11, 1)
  }

  if (today.getFullYear() === year && today.getMonth() === month - 1) {
    return new Date(year, month - 1, today.getDate())
  }
  return new Date(year, month - 1, 1)
}
