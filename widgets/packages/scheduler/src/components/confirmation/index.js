import { h } from 'preact'
import { useCallback, useEffect, useState } from 'preact/hooks'
import {
  AccentBox,
  BigCalendar,
  Box,
  Button,
  formatDate,
  H2,
  H3,
  Span,
  OutlineButton,
  formatDateForAPI,
} from '@canvas/common'
import { useAppContext } from '../../hooks'
import axios from 'axios'

export const Confirmation = () => {
  const {
    colors,
    timeSlot,
    treatment,
    date,
    locationId,
    patientId,
    api,
    patientKey,
    returnURL,
    setError,
  } = useAppContext()
  const [appointmentId, setAppointmentId] = useState(null)

  const data = {
    resource: {
      resourceType: 'Appointment',
      status: 'cancelled',
      supportingInformation: [
        {
          reference: `Location/${locationId}`,
        },
      ],
      start: new Date(timeSlot.start).toISOString(),
      end: new Date(timeSlot.end).toISOString(),
      participant: [
        {
          actor: {
            reference: `Practitioner/${timeSlot.provider.id}`,
          },
          status: 'accepted',
        },
        {
          actor: {
            reference: `Patient/${patientId}`,
          },
          status: 'accepted',
        },
      ],
    },
  }

  const findAppointment = useCallback(
    appointments => {
      return (
        appointments.entry.find(({ resource }) => {
          return (
            new Date(resource.start).toISOString() ===
              new Date(timeSlot.start).toISOString() &&
            new Date(resource.end).toISOString() ===
              new Date(timeSlot.end).toISOString()
          )
        })?.resource?.id || 'error'
      )
    },
    [timeSlot]
  )

  const handleAppointmentId = useCallback(
    appointment => {
      if (appointment) {
        setAppointmentId(appointment)
      } else {
        setError('Error Fetching Appointment')
      }
    },
    [setError]
  )

  useEffect(() => {
    axios
      .get(`${api}/Appointment`, {
        params: {
          patient: patientId,
          patient_key: patientKey,
          date: `ge${formatDateForAPI(date)}`,
          practitioner: timeSlot.provider.id,
        },
      })
      .then(response => findAppointment(response.data))
      .then(appointment => handleAppointmentId(appointment))
      .catch(() => setError('Error Fetching Appointment'))
  }, [
    api,
    date,
    findAppointment,
    handleAppointmentId,
    patientId,
    patientKey,
    setError,
    timeSlot.provider.id,
  ])

  const handleCancel = () => {
    if (appointmentId && appointmentId !== 'error') {
      axios
        .put(`${api}/Appointment/${appointmentId}`, JSON.stringify(data), {
          params: {
            patient: patientId,
            patient_key: patientKey,
          },
        })
        .then(() => (window.location = returnURL))
        .catch(() => setError('Error Cancelling Appointment Appointment'))
    }
  }

  return (
    <Box>
      <H2 style={{ '--my': '16px' }}>Your appointment has been scheduled</H2>

      <AccentBox style={{ '--bg': colors.accent }}>
        <Box style={{ '--mb': '16px' }}>
          <BigCalendar />
        </Box>
        <H3 style={{ '--mb': '8px' }}>
          {`${formatDate(date)} at ${timeSlot.start}`}
        </H3>
        <Span style={{ '--my': '8px' }}>
          {`${treatment} with ${timeSlot.provider.name}`}
        </Span>
        <OutlineButton style={{ '--my': '8px' }} onClick={() => handleCancel()}>
          Cancel
        </OutlineButton>
      </AccentBox>

      <Button
        style={{ '--bg': colors.primary, '--mt': '32px' }}
        onClick={() => (window.location = returnURL)}
      >
        Finish
      </Button>
    </Box>
  )
}
