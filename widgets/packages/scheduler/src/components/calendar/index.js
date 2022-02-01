import { h } from 'preact'
import { useAppContext } from '../../hooks'
import { getMonthAndYearOptions, getNextMonth, getPreviousMonth } from './utils'
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
    setDate(getNextMonth(date))
  }

  const navigateBack = () => {
    setDate(getPreviousMonth(date))
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
      navigateForward={navigateForward}
      navigateBack={navigateBack}
      handleDateChange={handleDateChange}
      monthsAndYears={monthsAndYears}
    />
  )
}
