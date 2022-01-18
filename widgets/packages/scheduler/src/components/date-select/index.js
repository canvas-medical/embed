import { h } from 'preact'
import {
  ArrowBack,
  ArrowForward,
  Box,
  Calendar,
  isToday,
  formatDate,
  styles,
  TzMessage,
  userTimezone,
} from '@canvas/common'
import { useAppContext } from '../../hooks'
import {
  DateHeading,
  DateScrollButton,
  DateSelectButton,
  DateViewContainer,
  IconContainer,
} from './styles'

export const DateSelect = () => {
  const { colors, date } = useAppContext()
  const backDisabled = isToday(date)

  return (
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
            <ArrowForward fill={colors.primary || styles.default.primary} />
          </IconContainer>
        </DateScrollButton>
      </DateViewContainer>

      <TzMessage>{`Appointment times shown in ${userTimezone}`}</TzMessage>
    </Box>
  )
}
