export function formatTime(datetime) {
  const date = new Date(datetime)
  return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
}

export const formatDate = date => {
  const dateArray = date.toDateString().split(' ')
  return `${dateArray[1]} ${dateArray[2]}, ${dateArray[3]}`
}

export const formatDateForAPI = date => {
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()

  console.log(year)
  console.log(month)
  console.log(day)
  return `${year}-${month < 10 ? `0${month}` : month}-${
    day < 10 ? `0${day}` : day
  }`
}

export const isToday = date => {
  const today = new Date()
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  )
}

export const userTimezone = new Date()
  .toLocaleTimeString('en-us', { timeZoneName: 'short' })
  .split(' ')[2]
