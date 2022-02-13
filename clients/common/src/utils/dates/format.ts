export function formatTime(datetime: string) {
  const date = new Date(datetime)
  return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
}

export const formatDate = (date: Date) => {
  const dateArray = date.toDateString().split(' ')
  return `${dateArray[1]} ${dateArray[2]}, ${dateArray[3]}`
}
