import { h, Fragment } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import {
  ArrowBack,
  ArrowForward,
  Box,
  Calendar as CalendarIcon,
  formatDate,
  H2,
  Span,
} from '@canvas/embed-common'
import { useAppContext } from '../../hooks'
import {
  isTodayOrBefore,
  scrollDateBack,
  scrollDateForward,
  userTimezone,
} from '../../utils'
import { DateViewContainer, DateScrollButton, DateSelectButton } from './styles'
import { Calendar } from './calendar'

export const DateSelect = () => {
  const { colors, date, setDate } = useAppContext()
  const [calendarOpen, setCalendarOpen] = useState(false)
  const backDisabled = isTodayOrBefore(date)

  useEffect(() => {
    const handleEsc = (event: any) => {
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
      <Box mt="16px">
        <DateViewContainer bc={colors.background}>
          <DateScrollButton
            fc={colors.accent.main}
            hc={colors.accent.hover}
            disabled={backDisabled}
            onClick={() => scrollDateBack(date, setDate)}
          >
            <ArrowBack />
          </DateScrollButton>

          <DateSelectButton
            hc={colors.accent.hover}
            onClick={() => setCalendarOpen(true)}
          >
            <CalendarIcon />
            <Box ml="10px" maxWidth="fit-content">
              <H2>{formatDate(date)}</H2>
            </Box>
          </DateSelectButton>

          <DateScrollButton
            fc={colors.accent.main}
            hc={colors.accent.hover}
            onClick={() => scrollDateForward(date, setDate)}
          >
            <ArrowForward />
          </DateScrollButton>
        </DateViewContainer>

        <Box my="0.875rem">
          <Span fontSize="0.875rem">{`Appointment times shown in ${userTimezone}`}</Span>
        </Box>
      </Box>
      <Calendar open={calendarOpen} close={() => setCalendarOpen(false)} />
    </Fragment>
  )
}
