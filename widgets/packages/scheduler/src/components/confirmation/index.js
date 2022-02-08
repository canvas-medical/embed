import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'
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
  putAppointment,
  getScheduledAppointment,
} from '@canvas/common'
import { useAppContext } from '../../hooks'

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
    appointmentTypeCode,
    reason,
  } = useAppContext()
  const [appointmentId, setAppointmentId] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getScheduledAppointment(
      setLoading,
      setError,
      setAppointmentId,
      api,
      patientId,
      patientKey,
      date,
      timeSlot
    )
  }, [api, date, patientId, patientKey, setError, timeSlot])

  const handleCancel = () => {
    if (appointmentId) {
      putAppointment(
        returnURL,
        setError,
        setLoading,
        appointmentTypeCode,
        treatment,
        reason,
        locationId,
        timeSlot,
        patientId,
        patientKey,
        api,
        appointmentId
      )
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
        <OutlineButton
          disabled={loading}
          style={{ '--my': '8px' }}
          onClick={() => handleCancel()}
        >
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
