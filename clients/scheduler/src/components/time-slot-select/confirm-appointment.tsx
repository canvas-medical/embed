import { h } from 'preact'
import {
  Box,
  Calendar,
  colors as appColors,
  H2,
  Button,
  formatDate,
  formatTime,
  ButtonGroup,
  getAppointmentType,
} from '@canvas-medical/embed-common'
import { useAppContext } from '../../hooks'

type ConfirmAppointmentType = {
  onCancel: Function
}

export const ConfirmAppointment = ({ onCancel }: ConfirmAppointmentType) => {
  const { loading, timeSlot, appointmentCoding, date, createAppointment } =
    useAppContext()

  const display =
    appointmentCoding.display ||
    getAppointmentType(appointmentCoding.code || '')

  return (
    <Box>
      <H2>Confirm Your Appointment</H2>

      <Box mt="1rem">
        <Calendar height={36} width={34} />
      </Box>

      <ul>
        <Box mt="1rem">
          <li>
            <strong>
              {`${formatDate(date)} at ${formatTime(timeSlot.start)}`}
            </strong>
          </li>
        </Box>
        <Box mt="1rem">
          <li>{`${display} with ${timeSlot.provider.name}`}</li>
        </Box>
      </ul>

      <ButtonGroup>
        <Button
          bc={appColors.primary.main}
          hc={appColors.primary.hover}
          fc={appColors.primary.font}
          onClick={() => createAppointment()}
          disabled={loading}
        >
          Confirm
        </Button>
        <Button
          bc={appColors.secondary.main}
          hc={appColors.secondary.hover}
          fc={appColors.secondary.font}
          onClick={() => onCancel()}
        >
          Cancel
        </Button>
      </ButtonGroup>
    </Box>
  )
}
