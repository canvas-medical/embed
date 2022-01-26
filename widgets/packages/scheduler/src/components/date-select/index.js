import { h, Fragment } from 'preact'
import {
  ArrowBack,
  ArrowForward,
  Box,
  Calendar as CalendarIcon,
  isToday,
  formatDate,
  styles,
  TzMessage,
  userTimezone,
} from '@canvas/common'
import { Calendar } from '../calendar'
import { useAppContext } from '../../hooks'
import {
  DateHeading,
  DateScrollButton,
  DateSelectButton,
  DateViewContainer,
  IconContainer,
} from './styles'
import { useState } from 'preact/hooks'

export const DateSelect = () => {
  const [calendarOpen, setCalendarOpen] = useState(false)
  const { colors, date } = useAppContext()
  const backDisabled = isToday(date)

  return (
    <Fragment>
      <Box style={{ '--mt': '16px' }}>
        <DateViewContainer style={{ '--bg': colors.accent }}>
          <DateScrollButton
            disabled={backDisabled}
            onClick={() => console.log("I'll send us back a day")}
          >
            <IconContainer>
              <ArrowBack
                fill={
                  backDisabled ? null : colors.primary || styles.default.primary
                }
              />
            </IconContainer>
          </DateScrollButton>

          <DateSelectButton onClick={() => setCalendarOpen(true)}>
            <IconContainer>
              <CalendarIcon />
            </IconContainer>
            <DateHeading>{formatDate(date)}</DateHeading>
          </DateSelectButton>

          <DateScrollButton
            onClick={() => console.log("I'll send us forward a day")}
          >
            <IconContainer>
              <ArrowForward fill={colors.primary || styles.default.primary} />
            </IconContainer>
          </DateScrollButton>
        </DateViewContainer>

        <TzMessage>{`Appointment times shown in ${userTimezone}`}</TzMessage>
      </Box>
      <Calendar open={calendarOpen} close={() => setCalendarOpen(false)} />
    </Fragment>
  )
}
