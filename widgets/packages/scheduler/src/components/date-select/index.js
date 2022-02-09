import { h, Fragment } from 'preact'
import {
  ArrowBack,
  ArrowForward,
  Box,
  Calendar as CalendarIcon,
  isToday,
  formatDate,
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
import { useEffect, useState } from 'preact/hooks'

export const DateSelect = () => {
  const { colors, date, setDate } = useAppContext()
  const [calendarOpen, setCalendarOpen] = useState(false)
  const backDisabled = isToday(date)

  const navigateBack = () => {
    setDate(new Date(date - 1))
  }

  const navigateForward = () => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()
    setDate(new Date(year, month, day + 1))
  }

  useEffect(() => {
    const handleEsc = event => {
      if (event.keyCode === 27) {
        setCalendarOpen(false)
      }
    }
    window.addEventListener('keydown', handleEsc)

    return () => {
      window.removeEventListener('keydown', handleEsc)
    }
  }, [])

  return (
    <Fragment>
      <Box style={{ '--mt': '16px' }}>
        <DateViewContainer style={{ '--bg': colors.background }}>
          <DateScrollButton
            style={{ '--mc': colors.accent.main, '--hc': colors.accent.hover }}
            disabled={backDisabled}
            onClick={() => navigateBack()}
          >
            <IconContainer>
              <ArrowBack />
            </IconContainer>
          </DateScrollButton>

          <DateSelectButton
            style={{ '--mc': colors.accent.main, '--hc': colors.accent.hover }}
            onClick={() => setCalendarOpen(true)}
          >
            <IconContainer>
              <CalendarIcon />
            </IconContainer>
            <DateHeading>{formatDate(date)}</DateHeading>
          </DateSelectButton>

          <DateScrollButton
            style={{ '--mc': colors.accent.main, '--hc': colors.accent.hover }}
            onClick={() => navigateForward()}
          >
            <IconContainer>
              <ArrowForward />
            </IconContainer>
          </DateScrollButton>
        </DateViewContainer>

        <TzMessage>{`Appointment times shown in ${userTimezone}`}</TzMessage>
      </Box>
      <Calendar open={calendarOpen} close={() => setCalendarOpen(false)} />
    </Fragment>
  )
}
