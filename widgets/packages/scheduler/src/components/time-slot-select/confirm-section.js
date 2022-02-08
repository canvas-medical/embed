import { h } from 'preact'
import {
  Box,
  BigCalendar,
  H2,
  IconBox,
  Button,
  OutlineButton,
  PopoverIcon,
  PopoverMessages,
  PopoverMessage,
  PopoverButtons,
  styles,
  formatDate,
  formatTime,
  postAppointment,
} from '@canvas/common'
import { useAppContext } from '../../hooks'
import { useState } from 'preact/hooks'

export const ConfirmSection = ({ onCancel }) => {
  const [loading, setLoading] = useState(false)
  const {
    timeSlot,
    setScreen,
    treatment,
    date,
    api,
    patientId,
    locationId,
    appointmentTypeCode,
    reason,
    patientKey,
    setError,
  } = useAppContext()

  const handleConfirmation = () => {
    postAppointment(
      () => setScreen('CONFIRM'),
      setError,
      setLoading,
      appointmentTypeCode,
      treatment,
      reason,
      locationId,
      timeSlot,
      patientId,
      patientKey,
      api
    )
  }

  return (
    <Box>
      <H2>Confirm Your Appointment</H2>

      <PopoverIcon>
        <IconBox>
          <BigCalendar />
        </IconBox>
      </PopoverIcon>

      <PopoverMessages>
        <PopoverMessage>
          <strong>
            {`${formatDate(date)} at ${formatTime(timeSlot.start)}`}
          </strong>
        </PopoverMessage>
        <PopoverMessage>{`${treatment} with ${timeSlot.provider.name}`}</PopoverMessage>
      </PopoverMessages>

      <PopoverButtons>
        <Button
          style={{
            '--bg': styles.buttons.primary.background,
            '--fc': styles.buttons.primary.focus,
            '--hc': styles.buttons.primary.hover,
            '--mx': '16px',
          }}
          onClick={handleConfirmation}
          disabled={loading}
        >
          Confirm
        </Button>
        <OutlineButton onClick={onCancel}>Cancel</OutlineButton>
      </PopoverButtons>
    </Box>
  )
}
