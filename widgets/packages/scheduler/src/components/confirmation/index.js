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

      <AccentBox style={{ '--bg': colors.background }}>
        <Box style={{ '--mb': '16px' }}>
          <BigCalendar />
        </Box>
        <H3 style={{ '--mb': '8px' }}>{dateString}</H3>
        <Span style={{ '--my': '8px' }}>
          {`${treatment} with ${timeSlot.provider.name}`}
        </Span>
        <Button
          disabled={loading}
          style={{
            '--bg': colors.accent.main,
            '--hc': colors.accent.hover,
            '-c': colors.accent.font,
            '--my': '8px',
            '--fw': '700',
          }}
          onClick={() => handleCancel()}
        >
          Cancel
        </Button>
      </AccentBox>

      <Button
        style={{
          '--bg': colors.accent.main,
          '--hc': colors.accent.hover,
          '-c': colors.accent.font,
          '--mt': '32px',
        }}
        onClick={() => (window.location = returnURL)}
      >
        Finish
      </Button>
    </Box>
  )
}
