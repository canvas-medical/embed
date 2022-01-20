import { h } from 'preact'
import { useState } from 'preact/hooks'
import {
  Body,
  AccentBox,
  Box,
  BigCalendar,
  H3,
  Span,
  OutlineButton,
  Popover,
} from '@canvas/common'
import { NoAppointments } from './no-appointments'
import { ConfirmCancellation } from './confirm-cancellation'

export const AppointmentsView = ({ colors, shadowRoot }) => {
  const [appointment, setAppointment] = useState({
    popoverOpen: false,
    id: null,
  })

  // This will be removed at a later stage when the proxy is able to return appointments
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      treatment: 'Example Treatment',
      provider: 'Example Provider, MD',
      start: new Date(),
    },
    {
      id: 2,
      treatment: 'Example Treatment',
      provider: 'Example Provider, MD',
      start: new Date(),
    },
  ])

  const handleCancel = id => {
    setAppointment({ popoverOpen: true, id })
  }

  const onCancel = id => {
    console.log('Some API request here')

    // This is just simulating removing an appointment. It will be removed later.
    setAppointments(appointments.filter(appointment => appointment.id !== id))
    setAppointment({ popoverOpen: false, id: null })
  }

  const keepAppointment = () => {
    setAppointment({ popoverOpen: false, id: null })
  }

  return (
    <Body>
      {appointments.length ? (
        appointments.map(appointment => (
          <AccentBox
            key={appointment.id}
            style={{ '--bg': colors.accent, '--my': '16px' }}
          >
            <Box style={{ '--mb': '8px' }}>
              <BigCalendar />
            </Box>
            <H3 style={{ '--mb': '8px' }}>Formatted Date</H3>
            <Span style={{ '--my': '8px' }}>
              {`${appointment.treatment} with ${appointment.provider}`}
            </Span>
            <OutlineButton
              style={{ '--my': '8px' }}
              onClick={() => handleCancel(appointment.id)}
            >
              Cancel
            </OutlineButton>
          </AccentBox>
        ))
      ) : (
        <NoAppointments />
      )}
      <Popover
        shadowRoot={shadowRoot}
        open={appointment.popoverOpen}
        onClose={() => keepAppointment()}
        titleId={'confirm-cancellation'}
      >
        <ConfirmCancellation
          cancelAppointment={() => onCancel(appointment.id)}
          keepAppointment={() => keepAppointment()}
        />
      </Popover>
    </Body>
  )
}
