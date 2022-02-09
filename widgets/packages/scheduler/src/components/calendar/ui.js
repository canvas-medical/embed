import { h } from 'preact'
import {
  ArrowBack,
  ArrowForward,
  Backdrop,
  Box,
  Close,
  IconButton,
  styles,
} from '@canvas/common'
import { useAppContext } from '../../hooks'
import {
  CalendarContainer,
  CalendarDateButton,
  CalendarDateContainer,
  CalendarHeaderBox,
  CalendarHeading,
  CalendarList,
  CalendarListItem,
  MonthBox,
  MonthSelect,
  ScreenReaderOnly,
} from './styles'
import { getSkipDays, generateDays, getMonthAndYearString } from './utils'

export const Ui = ({
  open,
  close,
  backDisabled,
  forwardDisabled,
  navigateForward,
  navigateBack,
  handleDateChange,
  monthsAndYears,
}) => {
  const { colors, date, setDate, shadowRoot } = useAppContext()
  const days = generateDays(date)
  const skipppedDays = getSkipDays(date)
  const dayMarkers = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

  return (
    <Backdrop open={open} close={close} shadowRoot={shadowRoot}>
      <CalendarContainer
        id="container"
        role="dialog"
        labelledby="calendar_label"
        aria-modal="true"
      >
        <Box
          style={{
            '--fd': 'row',
            '--mt': '16px',
            '--mb': '32px',
          }}
        >
          <CalendarHeaderBox>
            <CalendarHeading
              id="calendar_label"
              style={{
                '--c': colors.accent.main,
              }}
            >
              Calendar
            </CalendarHeading>
          </CalendarHeaderBox>
          <IconButton
            aria-label="Close Calendar"
            onClick={close}
            style={{
              '--mt': 0,
              '--mb': 0,
              '--mr': '8px',
              '--ml': 'auto',
              '--mc': colors.accent.main,
              '--hc': colors.accent.hover,
            }}
            tabIndex={-1}
          >
            <Close />
          </IconButton>
        </Box>

        <ScreenReaderOnly aria-live="assertive" role="region" id="monthSelect">
          {getMonthAndYearString(date)}
        </ScreenReaderOnly>

        <MonthBox style={{ '--p': '8px' }}>
          <MonthSelect
            // value={getMonthAndYearString(date)}
            onChange={e => setDate(new Date(e.target.value))}
            autoFocus
          >
            {monthsAndYears.map(monthAndYear => (
              <option
                selected={getMonthAndYearString(date) === monthAndYear.string}
                key={monthAndYear.string}
                value={monthAndYear.date}
              >
                {monthAndYear.string}
              </option>
            ))}
          </MonthSelect>

          <IconButton
            disabled={backDisabled}
            style={{
              '--ml': 'auto',
              '--mr': '8px',
              '--mc': colors.accent.main,
              '--hc': colors.accent.hover,
            }}
            onClick={navigateBack}
            aria-label="Previous Month"
          >
            <ArrowBack />
          </IconButton>

          <IconButton
            disabled={forwardDisabled}
            style={{
              '--ml': '4px',
              '--mr': '24px',
              '--mc': colors.accent.main,
              '--hc': colors.accent.hover,
            }}
            onClick={navigateForward}
            aria-label="Next Month"
          >
            <ArrowForward
              fill={forwardDisabled ? styles.font.grey25 : styles.font.grey50}
            />
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
                  style={{
                    '--bg': colors.accent.main,
                    '--fc': colors.accent.font,
                  }}
                  disabled={day.disabled}
                  selected={day.date === date.getDate()}
                  onClick={() => handleDateChange(day.date)}
                >
                  {day.date}
                </CalendarDateButton>
              </CalendarListItem>
            ))}
          </CalendarList>
        </CalendarDateContainer>
      </CalendarContainer>
    </Backdrop>
  )
}
