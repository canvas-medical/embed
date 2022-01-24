import {
  Box,
  Button,
  H2,
  OutlineButton,
  PopoverButtons,
  styles,
} from '@canvas/common'
import { h } from 'preact'

export const ConfirmCancellation = ({ cancelAppointment, keepAppointment }) => (
  <Box>
    <H2>Cancel Your Appointment</H2>

    <PopoverButtons>
      <Button
        style={{
          '--bg': styles.buttons.secondary.background,
          '--fc': styles.buttons.secondary.focus,
          '--hc': styles.buttons.secondary.hover,
          '--mx': '16px',
        }}
        onClick={cancelAppointment}
      >
        Yes, cancel it
      </Button>
      <OutlineButton onClick={keepAppointment}>No, keep it</OutlineButton>
    </PopoverButtons>
  </Box>
)
