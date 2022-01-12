import { h } from 'preact'

import {
  DateHeading,
  DateScrollButton,
  DateSelectButton,
  DateViewContainer,
  IconContainer,
} from './styles'

import {
  ArrowBack,
  ArrowForward,
  Box,
  Calendar,
  isToday,
  Span,
  formatDate,
  styles,
} from '@canvas/common'
import { useAppContext } from '../../hooks'

export const DateSelect = ({ date }) => {
  const { colors } = useAppContext()
  const backDisabled = isToday(date)
  const userTimezone = new Date()
    .toLocaleTimeString('en-us', { timeZoneName: 'short' })
    .split(' ')[2]

  return (
    <Box mt="16px">
      <DateViewContainer backgroundColor={colors.accent}>
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

        <DateSelectButton>
          <IconContainer>
            <Calendar />
          </IconContainer>
          <DateHeading>{formatDate(date)}</DateHeading>
        </DateSelectButton>

        <DateScrollButton
          onClick={() => console.log("I'll send us forward a day")}
        >
          <IconContainer>
            <ArrowForward fill={styles.default.primary} />
          </IconContainer>
        </DateScrollButton>
      </DateViewContainer>

      <Box mt="12px" mb="16px">
        <Span>{`Appointment times shown in ${userTimezone}`}</Span>
      </Box>
    </Box>
  )
}
