import { h } from 'preact'
import { useCallback, useEffect, useState } from 'preact/hooks'
import {
  Body,
  AccentBox,
  Box,
  BigCalendar,
  H3,
  Span,
  OutlineButton,
  Popover,
  listAppointments,
  getAppointmentType,
  Loader,
  putAppointment,
  formatDate,
  formatTime,
} from '@canvas/common'
import { NoAppointments } from './no-appointments'
import { ConfirmCancellation } from './confirm-cancellation'

export const AppointmentsView = ({
  api,
  colors,
  locationId,
  patientId,
  patientKey,
  providers,
  shadowRoot,
}) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [appointmentCancellation, setAppointmentCancellation] = useState({
    popoverOpen: false,
    id: null,
  })

  // This will be removed at a later stage when the proxy is able to return appointments
  const [appointments, setAppointments] = useState([])

  const handleCancel = appointment => {
    setAppointmentCancellation({ popoverOpen: true, appointment })
  }

  const fetchAppointments = useCallback(() => {
    listAppointments(
      setLoading,
      setError,
      setAppointments,
      providers,
      api,
      patientId,
      patientKey
    )
  }, [api, patientId, patientKey, providers])

  const afterCancel = () => {
    setAppointmentCancellation({ popoverOpen: false, appointment: null })
    fetchAppointments()
  }

  const onCancel = () => {
    putAppointment(
      afterCancel,
      setError,
      setLoading,
      appointmentCancellation.appointment.type,
      getAppointmentType(appointmentCancellation.appointment.type).type,
      appointmentCancellation.appointment.reason,
      locationId,
      {
        start: appointmentCancellation.appointment.start,
        end: appointmentCancellation.appointment.end,
        provider: appointmentCancellation.appointment.provider,
      },
      patientId,
      patientKey,
      api,
      appointmentCancellation.appointment.id
    )
  }

  const keepAppointment = () => {
    setAppointmentCancellation({ popoverOpen: false, appointment: null })
  }

  useEffect(() => {
    fetchAppointments()
  }, [fetchAppointments])

  if (loading) {
    return <Loader />
  }

  return (
    <Body>
      {error && <div>{error}</div>}
      {appointments.length ? (
        appointments.map(appointment => {
          const appointmentDate = new Date(appointment.start)
          const dateString = `${formatDate(appointmentDate)} at ${formatTime(
            appointmentDate
          )}`

          return (
            <AccentBox
              key={appointment.id}
              style={{ '--bg': colors.accent, '--my': '16px' }}
            >
              <Box style={{ '--mb': '8px' }}>
                <BigCalendar />
              </Box>
              <H3 style={{ '--mb': '8px' }}>{dateString}</H3>
              <Span style={{ '--my': '8px' }}>
                {`${getAppointmentType(appointment.type).type} with ${
                  appointment.provider.name
                }`}
              </Span>
              <OutlineButton
                style={{ '--my': '8px' }}
                onClick={() => handleCancel(appointment)}
              >
                Cancel
              </OutlineButton>
            </AccentBox>
          )
        })
      ) : (
        <NoAppointments />
      )}
      <Popover
        shadowRoot={shadowRoot}
        open={appointmentCancellation.popoverOpen}
        onClose={() => keepAppointment()}
        titleId={'confirm-cancellation'}
      >
        <ConfirmCancellation
          cancelAppointment={() => onCancel()}
          keepAppointment={() => keepAppointment()}
        />
      </Popover>
    </Body>
  )
}
