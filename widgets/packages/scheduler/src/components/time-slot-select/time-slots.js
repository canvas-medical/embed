import { h } from 'preact'
import {
  Box,
  Fieldset,
  formatTime,
  Legend,
  ScreenReaderText,
} from '@canvas/common'
import { useAppContext } from '../../hooks'
import { TimeSlotButton, TimeSlotItem, TimeSlotList } from './styles'

export const TimeSlots = ({ provider, slots, selectTimeSlot }) => {
  const { colors } = useAppContext()

  return (
    <Fieldset
      style={{
        '--bg': colors.background,
      }}
    >
      <Box style={{ '--ai': 'unset', '--fd': 'row' }}>
        <Legend>{provider.name}</Legend>
      </Box>
      {slots.length ? (
        <TimeSlotList>
          {slots.map(({ start, end }) => {
            return (
              <TimeSlotItem key={start}>
                <TimeSlotButton
                  style={{
                    '--bg': colors.accent.main,
                    '--hc': colors.accent.hover,
                    '--c': colors.accent.font,
                  }}
                  id={start}
                  onClick={() =>
                    selectTimeSlot({
                      end,
                      provider,
                      start,
                    })
                  }
                >
                  <ScreenReaderText>Select time slot for</ScreenReaderText>
                  {`${formatTime(start)} - ${formatTime(end)}`}
                </TimeSlotButton>
              </TimeSlotItem>
            )
          })}
        </TimeSlotList>
      ) : (
        <Box style={{ '--my': '1rem' }}>
          No Appointments Found for this Date
        </Box>
      )}
    </Fieldset>
  )
}
