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
  formatTime,
} from '@canvas/common'
import { useAppContext } from '../../hooks'

export const Confirmation = () => {
  const {
    colors,
    timeSlot,
    treatment,
    returnURL,
    handleCancelAppointment,
    handleScheduledAppointment,
  } = useAppContext()
  const [appointmentId, setAppointmentId] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    handleScheduledAppointment(setLoading, setAppointmentId)
  }, [handleScheduledAppointment])

  const handleCancel = () => {
    if (appointmentId) {
      handleCancelAppointment(setLoading, appointmentId)
    }
  }

  const appointmentDate = new Date(timeSlot.start)
  const dateString = `${formatDate(appointmentDate)} at ${formatTime(
    appointmentDate
  )}`

  return (
    <Box>
      <H2 style={{ '--my': '16px' }}>Your appointment has been scheduled</H2>

      <AccentBox style={{ '--bg': colors.accent }}>
        <Box style={{ '--mb': '16px' }}>
          <BigCalendar />
        </Box>
        <H3 style={{ '--mb': '8px' }}>{dateString}</H3>
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
