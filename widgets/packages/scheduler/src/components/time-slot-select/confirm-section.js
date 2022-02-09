import { h } from 'preact'
import {
  Box,
  BigCalendar,
  H2,
  IconBox,
  Button,
  PopoverIcon,
  PopoverMessages,
  PopoverMessage,
  PopoverButtons,
  styles,
  formatDate,
  formatTime,
} from '@canvas/common'
import { useAppContext } from '../../hooks'
import { useState } from 'preact/hooks'

export const ConfirmSection = ({ onCancel }) => {
  const [loading, setLoading] = useState(false)
  const { timeSlot, treatment, date, hanleCreateAppointment } = useAppContext()

  const handleConfirmation = () => {
    hanleCreateAppointment(setLoading)
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
            '--bg': styles.positive.main,
            '--hc': styles.positive.hover,
            '--mx': '16px',
            '--fw': '700',
          }}
          onClick={handleConfirmation}
          disabled={loading}
        >
          Confirm
        </Button>
        <Button
          style={{
            '--bg': styles.secondary.main,
            '--hc': styles.secondary.hover,
            '--c': styles.font.grey75,
            '--mx': '16px',
            '--fw': '700',
          }}
          onClick={onCancel}
        >
          Cancel
        </Button>
      </PopoverButtons>
    </Box>
  )
}
