import { h } from 'preact'
import { useAppContext } from '../../../hooks'
import {
  getMonthAndYearOptions,
  getNextMonth,
  getPreviousMonth,
  isEarliestDateOrBefore,
  sameMonthAndYear,
} from '../../../utils/dates'
import { Ui } from './ui'

type CalendarPropsType = {
  open: boolean
  close: Function
  enabledDates: Set<string>
  maxDate?: Date
}

export const Calendar = ({
  open,
  close,
  enabledDates,
  maxDate,
}: CalendarPropsType) => {
  const {
    callbacks: { onClick },
    date,
    startDate,
    setDate,
  } = useAppContext()
  const monthsAndYears = getMonthAndYearOptions(startDate)

  const backDisabled = sameMonthAndYear(date, monthsAndYears[0].date)
  const forwardDisabled = sameMonthAndYear(
    date,
    monthsAndYears[monthsAndYears.length - 1].date
  )

  const navigateForward = (e: React.MouseEvent<HTMLButtonElement>) => {
    const newDate = getNextMonth(date)
    setDate(newDate)
    onClick(e, { date: newDate })
  }

  const navigateBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    const newDate = getPreviousMonth(date)
    setDate(newDate)
    onClick(e, { date: newDate })
  }

  const handleDateChange = (
    e: React.MouseEvent<HTMLButtonElement>,
    day: number
  ) => {
    const month = date.getMonth()
    const year = date.getFullYear()

    let newDate = new Date(year, month, day)

    if (isEarliestDateOrBefore(newDate, startDate)) {
      newDate = startDate || new Date()
    }

    setDate(newDate)
    onClick(e, { date: newDate })
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
