export function formatTime(datetime: string | Date) {
  const date = new Date(datetime)
  return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
}

export const formatDate = (date: Date) => {
  const dateArray = date.toDateString().split(' ')
  return `${dateArray[1]} ${dateArray[2]}, ${dateArray[3]}`
}

export const formatDateForAPI = (date: Date) => {
  return date.toISOString().slice(0, 10)
}

export const toISOString = (datestring: string) => {
  return new Date(datestring).toISOString()
}
