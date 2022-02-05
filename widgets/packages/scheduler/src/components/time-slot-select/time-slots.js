import { h } from 'preact'
import { useState } from 'preact/hooks'
import {
  ArrowBack,
  ArrowForward,
  Box,
  Fieldset,
  formatTime,
  IconButton,
  Legend,
  styles,
} from '@canvas/common'
import { useAppContext } from '../../hooks'
import { TimeSlotButton, TimeSlotItem, TimeSlotList } from './styles'

export const TimeSlots = ({ provider, slots, selectTimeSlot }) => {
  const { colors } = useAppContext()
  const [slotsIndex, setSlotsIndex] = useState(0)
  const backDisabled = slotsIndex < 12
  const forwardDisabled = slotsIndex + 12 > slots.length

  const scrollForward = () => {
    setSlotsIndex(slotsIndex + 12)
  }

  const scrollBack = () => {
    setSlotsIndex(slotsIndex - 12)
  }

  return (
    <Fieldset
      style={{
        '--bg': colors.accent,
      }}
    >
      <Box style={{ '--ai': 'unset', '--fd': 'row' }}>
        <Legend>{provider.name}</Legend>
        <Box
          style={{ '--ml': 'auto', '--mr': '8px', '--width': 'fit-content' }}
        >
          <IconButton disabled={backDisabled} onClick={() => scrollBack()}>
            <ArrowBack
              fill={
                backDisabled ? null : colors.primary || styles.default.primary
              }
            />
          </IconButton>
          <IconButton
            disabled={forwardDisabled}
            onClick={() => scrollForward()}
          >
            <ArrowForward
              fill={
                forwardDisabled
                  ? null
                  : colors.primary || styles.default.primary
              }
            />
          </IconButton>
        </Box>
      </Box>
      {slots.length ? (
        <TimeSlotList>
          {slots.map(({ start, end }, index) => {
            if (index < slotsIndex || index > slotsIndex + 11) {
              return null
            }
            return (
              <TimeSlotItem key={start}>
                <TimeSlotButton
                  style={{
                    '--bg': colors.primary,
                    '--fc': colors.focus,
                    '--hc': colors.focus,
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
