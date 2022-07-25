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
  const {
    colors,
    callbacks: { onClick, overrideTimeSlotSelect },
  } = useAppContext()

  const handleTimeSlotClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    { start, end }: { start: string; end: string }
  ) => {
    onClick(e, { end, provider, start })

    if (overrideTimeSlotSelect) {
      overrideTimeSlotSelect(e, { end, provider, start })
    } else {
      selectTimeSlot({ end, provider, start })
    }
  }

  return (
    <Fieldset bc={colors.background}>
      <Box alignItems="unset" flexDirection="row">
        <Legend>{provider.name}</Legend>
      </Box>
      {slots.length ? (
        <TimeSlotList>
          {slots.map(slot => (
            <TimeSlotButton
              id={slot.start}
              bc={colors.accent.main}
              hc={colors.accent.hover}
              fc={colors.accent.font}
              data-analytics-id="timeslot-button"
              onClick={e => handleTimeSlotClick(e, slot)}
            >
              <ScreenReaderText>Select time slot for</ScreenReaderText>
              {`${formatTime(slot.start)} - ${formatTime(slot.end)}`}
            </TimeSlotButton>
          ))}
        </TimeSlotList>
      ) : (
        <Box my="1rem">No Appointments Found for this Date</Box>
      )}
    </Fieldset>
  )
}
