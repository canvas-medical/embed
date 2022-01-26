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
      <CalendarContainer>
        <Box
          style={{
            '--fd': 'row',
            '--mt': '16px',
            '--mb': '32px',
          }}
        >
          <CalendarHeaderBox>
            <CalendarHeading
              style={{
                '--c': colors.primary,
              }}
            >
              Calendar
            </CalendarHeading>
          </CalendarHeaderBox>
          <IconButton
            onClick={close}
            style={{ '--mt': 0, '--mb': 0, '--mr': '8px', '--ml': 'auto' }}
          >
            <Close fill={colors.primary || styles.default.primary} />
          </IconButton>
        </Box>

        <MonthBox style={{ '--p': '8px' }}>
          <MonthSelect value={getMonthAndYearString(date)}>
            {monthsAndYears.map(monthAndYear => (
              <option
                key={monthAndYear.string}
                onClick={() => setDate(monthAndYear.date)}
              >
                {monthAndYear.string}
              </option>
            ))}
          </MonthSelect>

          <IconButton
            disabled={backDisabled}
            style={{ '--ml': 'auto', '--mr': '8px' }}
            onClick={navigateBack}
          >
            <ArrowBack
              fill={backDisabled ? styles.font.grey25 : styles.font.grey50}
            />
          </IconButton>

          <IconButton
            disabled={forwardDisabled}
            style={{ '--ml': '4px', '--mr': '24px' }}
            onClick={navigateForward}
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
                  style={{ '--bg': colors.primary }}
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
