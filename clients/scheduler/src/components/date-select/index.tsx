import { h, Fragment } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import {
  ArrowBack,
  ArrowForward,
  Box,
  formatDate,
  H2,
  Span,
} from '@canvas-medical/embed-common'
import { useAppContext } from '../../hooks'
import {
  isTodayOrBefore,
  scrollDateBack,
  scrollDateForward,
  userTimezone,
} from '../../utils'
import { ArrowDown } from './arrow-down'
import { DateViewContainer, DateScrollButton, DateSelectButton } from './styles'
import { Calendar } from './calendar'

type DateSelectPropsType = {
  enabledDates: Set<string>
  maxDate?: Date
}

export const DateSelect = ({ enabledDates, maxDate }: DateSelectPropsType)=> {
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
            aria-label="Scroll Date Back"
            fc={colors.accent.main}
            hc={colors.accent.hover}
            disabled={backDisabled}
            onClick={() => scrollDateBack(date, setDate)}
          >
            <ArrowBack />
          </DateScrollButton>

          <DateSelectButton
            aria-label="Open Date Picker"
            hc={colors.accent.hover}
            onClick={() => setCalendarOpen(true)}
          >
            <Box ml="10px" maxWidth="fit-content">
              <H2>{formatDate(date)}</H2>
            </Box>
            <ArrowDown />
          </DateSelectButton>

          <DateScrollButton
            aria-label="Scroll Date Forward"
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
      <Calendar open={calendarOpen} close={() => setCalendarOpen(false)} enabledDates={enabledDates} maxDate={maxDate} />
    </Fragment>
  )
}
