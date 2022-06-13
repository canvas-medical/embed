import { h } from 'preact'
import { useAppContext } from '../../../hooks'
import {
  getMonthAndYearOptions,
  getNextMonth,
  getPreviousMonth,
  isTodayOrBefore,
  sameMonthAndYear,
} from '../../../utils/dates'
import { Ui } from './ui'

type CalendarPropsType = {
  open: boolean
  close: Function
  enabledDates: Set<string>
  maxDate?: Date
}

export const Calendar = ({ open, close, enabledDates, maxDate }: CalendarPropsType) => {
  const { callbacks: { onBookingDateChange }, date, providerIds, setDate } = useAppContext()
  const monthsAndYears = getMonthAndYearOptions()

  const backDisabled = sameMonthAndYear(date, monthsAndYears[0].date)
  const forwardDisabled = sameMonthAndYear(
    date,
    monthsAndYears[monthsAndYears.length - 1].date
  )

  const navigateForward = () => {
    setDate(getNextMonth(date))
  }

  const navigateBack = () => {
    setDate(getPreviousMonth(date))
  }

  const handleDateChange = (day: number) => {
    const month = date.getMonth()
    const year = date.getFullYear()

    let newDate = new Date(year, month, day)

    if (isTodayOrBefore(newDate)) {
      newDate = new Date()
    }

    setDate(newDate)
    onBookingDateChange({ direction: "", date: newDate, providerIds })

    close()
  }

  return (
    <Ui
      open={open}
      close={close}
      backDisabled={backDisabled}
      enabledDates={enabledDates}
      forwardDisabled={forwardDisabled}
      maxDate={maxDate}
      navigateForward={navigateForward}
      navigateBack={navigateBack}
      handleDateChange={handleDateChange}
      monthsAndYears={monthsAndYears}
    />
  )
}
