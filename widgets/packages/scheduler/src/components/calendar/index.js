import { h } from 'preact'
import { useAppContext } from '../../hooks'
import { getMonthAndYearOptions } from './utils'
import { Ui } from './ui'

export const Calendar = ({ open, close }) => {
  const { date, setDate } = useAppContext()
  const today = new Date()
  const monthsAndYears = getMonthAndYearOptions(today)

  const backDisabled =
    date.getMonth() === monthsAndYears[0].date.getMonth() &&
    date.getFullYear() === monthsAndYears[0].date.getFullYear()

  const forwardDisabled =
    date.getMonth() ===
      monthsAndYears[monthsAndYears.length - 1].date.getMonth() &&
    date.getFullYear() ===
      monthsAndYears[monthsAndYears.length - 1].date.getFullYear()

  const navigateForward = () => {
    const month = date.getMonth()
    const year = date.getFullYear()

    if (month === 11) {
      setDate(new Date(year + 1, 0, 1))
    }

    setDate(new Date(year, month + 1, 1))
  }

  const navigateBack = () => {
    const month = date.getMonth()
    const year = date.getFullYear()

    if (month === 0) {
      if (today.getFullYear() === year - 1 && today.getMonth === 11) {
        setDate(new Date(year - 1, 11, today.getDate()))
      } else {
        setDate(new Date(year - 1, 11, 1))
      }
    }

    if (today.getFullYear() === year && today.getMonth() === month - 1) {
      setDate(new Date(year, month - 1, today.getDate()))
    } else {
      setDate(new Date(year, month - 1, 1))
    }
  }

  const handleDateChange = day => {
    const month = date.getMonth()
    const year = date.getFullYear()

    setDate(new Date(year, month, day))
    close()
  }

  return (
    <Ui
      open={open}
      close={close}
      backDisabled={backDisabled}
      forwardDisabled={forwardDisabled}
      navigateForward={() => navigateForward()}
      navigateBack={() => navigateBack()}
      handleDateChange={handleDateChange}
      monthsAndYears={monthsAndYears}
    />
  )
}
