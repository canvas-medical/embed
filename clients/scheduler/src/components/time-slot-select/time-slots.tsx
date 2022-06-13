import { h } from 'preact'
import {
  Box,
  Fieldset,
  formatTime,
  Legend,
  ProvidersType,
  ScreenReaderText,
  SlotType,
} from '@canvas-medical/embed-common'
import { useAppContext } from '../../hooks'
import { TimeSlotButton, TimeSlotList } from './styles'

type TimeSlotsType = {
  provider: ProvidersType
  slots: SlotType[]
  selectTimeSlot: Function
}

export const TimeSlots = ({
  provider,
  slots,
  selectTimeSlot,
}: TimeSlotsType) => {
  const { colors, callbacks: { onBookingTimeSlotSelected }, setTimeSlot } = useAppContext()

  const onClick = () => {
    selectTimeSlot({ end, provider, start })
    onBookingTimeSlotSelected({ end, provider, start })
  }

  return (
    <Fieldset bc={colors.background}>
      <Box alignItems="unset" flexDirection="row">
        <Legend>{provider.name}</Legend>
      </Box>
      {slots.length ? (
        <TimeSlotList>
          {slots.map(({ start, end }) => (
            <TimeSlotButton
              id={start}
              bc={colors.accent.main}
              hc={colors.accent.hover}
              fc={colors.accent.font}
              onClick={onClick}
            >
              <ScreenReaderText>Select time slot for</ScreenReaderText>
              {`${formatTime(start)} - ${formatTime(end)}`}
            </TimeSlotButton>
          ))}
        </TimeSlotList>
      ) : (
        <Box my="1rem">No Appointments Found for this Date</Box>
      )}
    </Fieldset>
  )
}
