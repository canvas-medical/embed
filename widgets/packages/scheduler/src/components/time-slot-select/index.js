import { h, Fragment } from 'preact'
import { useState } from 'preact/hooks'
import { Section, Popover, H2 } from '@canvas/common'
import { ConfirmSection } from './confirm-section'
import { TimeSlotButton, TimeSlotContainer } from './styles'

export const TimeSlotSelect = ({ colors, setScreen }) => {
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
      treatment: 'Exmaple treatment',
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
          <Section key={id} mb="16px" backgroundColor={colors.accent}>
            <H2>{provider}</H2>
            <TimeSlotContainer>
              {timeSlots.map(({ id, start, end }) => (
                <TimeSlotButton
                  backgroundColor={colors.primary}
                  focusColor={colors.focus}
                  ml="7px"
                  mr="7px"
                  key={id}
                  onClick={() =>
                    setTimeSlot({ id, start, provider, treatment })
                  }
                >{`${start} - ${end}`}</TimeSlotButton>
              ))}
            </TimeSlotContainer>
          </Section>
        )
      })}
      <Popover
        open={selectedTimeSlot.popoverOpen}
        onClose={() => cancelConfirmation()}
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
