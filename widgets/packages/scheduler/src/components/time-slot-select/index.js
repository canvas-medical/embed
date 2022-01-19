import { h, Fragment } from 'preact'
import { useState } from 'preact/hooks'
import { Fieldset, Legend, Popover } from '@canvas/common/components'
import { TimeSlotButton, TimeSlotItem, TimeSlotList } from './styles'
import { ConfirmSection } from './confirm-section'
import { useAppContext } from '../../hooks'

export const TimeSlotSelect = ({ setScreen }) => {
  const { shadowRoot, colors } = useAppContext()
  const [selectedTimeSlot, setSelectedTimeSlot] = useState({
    popoverOpen: false,
  })

  const cancelConfirmation = () => {
    setSelectedTimeSlot({ popoverOpen: false })
  }

  const setTimeSlot = ({ id, start, provider, treatment }) => {
    setSelectedTimeSlot({
      popoverOpen: true,
      id,
      start,
      provider,
      treatment,
    })
  }

  const data = [
    {
      provider: 'Jane Doe, MD',
      id: 1,
      treatment: 'Example treatment',
      timeSlots: [
        { start: '10:00AM', end: '10:30AM', id: 1 },
        { start: '10:30AM', end: '11:00AM', id: 2 },
        { start: '11:00AM', end: '11:30AM', id: 3 },
        { start: '11:30AM', end: '12:00PM', id: 4 },
        { start: '12:00AM', end: '12:30AM', id: 5 },
      ],
    },
    {
      provider: 'Jim Deer, MD',
      id: 2,
      timeSlots: [
        { start: '10:00AM', end: '10:30AM', id: 1 },
        { start: '10:30AM', end: '11:00AM', id: 2 },
        { start: '11:00AM', end: '11:30AM', id: 3 },
        { start: '11:30AM', end: '12:00PM', id: 4 },
        { start: '12:00AM', end: '12:30AM', id: 5 },
      ],
    },
  ]

  return (
    <Fragment>
      {data.map(({ provider, timeSlots, id, treatment }) => {
        return (
          <Fieldset
            key={id}
            style={{
              '--bg': colors.accent,
            }}
          >
            <Legend>{provider}</Legend>
            <TimeSlotList>
              {timeSlots.map(({ id, start, end }) => (
                <TimeSlotItem key={id}>
                  <TimeSlotButton
                    style={{
                      '--bg': colors.primary,
                      '--fc': colors.focus,
                      '--hc': colors.focus,
                    }}
                    id={id}
                    onClick={() =>
                      setTimeSlot({ id, start, provider, treatment })
                    }
                  >{`${start} - ${end}`}</TimeSlotButton>
                </TimeSlotItem>
              ))}
            </TimeSlotList>
          </Fieldset>
        )
      })}
      <Popover
        shadowRoot={shadowRoot}
        open={selectedTimeSlot.popoverOpen}
        onClose={() => cancelConfirmation()}
        titleId={'confirm-slot'}
      >
        <ConfirmSection
          {...selectedTimeSlot}
          onCancel={() => cancelConfirmation()}
          setScreen={setScreen}
        />
      </Popover>
    </Fragment>
  )
}
