export function formatTime(datetime: string) {
  const date = new Date(datetime)
  return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
}
