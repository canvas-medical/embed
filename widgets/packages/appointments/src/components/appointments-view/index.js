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
} from '@canvas/common'
import { NoAppointments } from './no-appointments'

export const AppointmentsView = ({ colors }) => {
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

  const onCancel = id => {
    console.log('Some API request here')
    setAppointments(appointments.filter(appointment => appointment.id !== id))
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
              onClick={() => onCancel(appointment.id)}
            >
              Cancel
            </OutlineButton>
          </AccentBox>
        ))
      ) : (
        <NoAppointments />
      )}
    </Body>
  )
}
