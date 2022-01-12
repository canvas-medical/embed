export const formatDate = date => {
  const dateArray = date.toDateString().split(' ')
  return `${dateArray[1]} ${dateArray[2]}, ${dateArray[3]}`
}

export const isToday = date => {
  const today = new Date()
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  )
}
