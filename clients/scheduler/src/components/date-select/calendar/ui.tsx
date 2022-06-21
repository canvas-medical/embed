import {
  ArrowBack,
  ArrowForward,
  Box,
  Close,
  FocusTrapBackdrop,
  H2,
  IconButton,
  ScreenReaderText,
} from '@canvas-medical/embed-common'
import { useAppContext } from '../../../hooks'
import {
  generateDays,
  getMonthAndYearString,
  getSkipDays,
  MonthAndYearType,
} from '../../../utils'
import {
  CalendarContainer,
  CalendarDateButton,
  CalendarDateContainer,
  CalendarHeaderBox,
  CalendarList,
  CalendarListItem,
  MonthBox,
  MonthSelect,
} from './styles'

type CalendarUiPropsType = {
  open: boolean
  close: Function
  backDisabled: boolean
  enabledDates: Set<string>
  forwardDisabled: boolean
  maxDate?: Date
  navigateForward: Function
  navigateBack: Function
  handleDateChange: Function
  monthsAndYears: MonthAndYearType[]
}

export const Ui = ({
  open,
  close,
  backDisabled,
  enabledDates,
  forwardDisabled,
  maxDate,
  navigateForward,
  navigateBack,
  handleDateChange,
  monthsAndYears,
}: CalendarUiPropsType) => {
  const {
    colors,
    date,
    setDate,
    shadowRoot,
    callbacks: { onChange, onClick },
  } = useAppContext()
  const days = generateDays(date, enabledDates, maxDate)
  const skipppedDays = getSkipDays(date)
  const dayMarkers = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newDate = new Date(e.target.value)
    setDate(newDate)
    onChange(e, { date: newDate })
  }
  const handleCalendarClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick(e)
    close()
  }

  return (
    <FocusTrapBackdrop open={open} shadowRoot={shadowRoot} zIndex={2000}>
      <CalendarContainer
        id="container"
        role="dialog"
        aria-labelledby="calendar_label"
        aria-modal="true"
      >
        <Box flexDirection="row" mt="16px" mb="32px">
          <CalendarHeaderBox>
            <H2 id="calendar_label" fc={colors.brand.main}>
              Calendar
            </H2>
          </CalendarHeaderBox>
          <IconButton
            aria-label="Close Calendar"
            onClick={e => handleCalendarClose(e)}
            data-analytics-id="calendar-close"
            tabIndex={-1}
            mr="8px"
            ml="auto"
            fc={colors.brand.main}
            hc={colors.brand.hover}
          >
            <Close />
          </IconButton>
        </Box>

        <ScreenReaderText aria-live="assertive" role="region" id="monthSelect">
          {getMonthAndYearString(date)}
        </ScreenReaderText>

        <MonthBox>
          <MonthSelect
            // value={getMonthAndYearString(date)}
            autoFocus
            data-analytics-id="calendar-month-select"
            onChange={handleMonthChange}
          >
            {monthsAndYears.map(monthAndYear => (
              <option
                selected={getMonthAndYearString(date) === monthAndYear.string}
                key={monthAndYear.string}
                value={monthAndYear.date.toDateString()}
              >
                {monthAndYear.string}
              </option>
            ))}
          </MonthSelect>

          <IconButton
            disabled={backDisabled}
            ml="auto"
            mr="8px"
            onClick={e => navigateBack(e)}
            data-analytics-id="calendar-month-back"
            aria-label="Previous Month"
            fc={colors.brand.main}
            hc={colors.brand.hover}
          >
            <ArrowBack />
          </IconButton>

          <IconButton
            disabled={forwardDisabled}
            ml="4px"
            mr="24px"
            onClick={e => navigateForward(e)}
            data-analytics-id="calendar-month-forward"
            aria-label="Next Month"
            fc={colors.brand.main}
            hc={colors.brand.hover}
          >
            <ArrowForward />
          </IconButton>
        </MonthBox>

        <CalendarDateContainer>
          <CalendarList>
            {dayMarkers.map((dayMarker, index) => (
              <CalendarListItem key={index}>{dayMarker}</CalendarListItem>
            ))}
          </CalendarList>

          <CalendarList>
            {skipppedDays.map(skippedDay => (
              <CalendarListItem key={skippedDay} />
            ))}
            {days.map(day => (
              <CalendarListItem key={day.date}>
                <CalendarDateButton
                  aria-label={day.dateString}
                  bc={colors.accent.main}
                  fc={colors.accent.font}
                  disabled={day.disabled}
                  selected={day.date === date.getDate()}
                  data-analytics-id="calendar-date-select"
                  onClick={e => handleDateChange(e, day.date)}
                >
                  {day.date}
                </CalendarDateButton>
              </CalendarListItem>
            ))}
          </CalendarList>
        </CalendarDateContainer>
      </CalendarContainer>
    </FocusTrapBackdrop>
  )
}
