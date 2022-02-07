export function formatTime(datetime) {
  const date = new Date(datetime)
  return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
}

export const formatDate = date => {
  const dateArray = date.toDateString().split(' ')
  return `${dateArray[1]} ${dateArray[2]}, ${dateArray[3]}`
}

export const formatDateForAPI = date => {
  return date.toISOString().slice(0, 10)
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
