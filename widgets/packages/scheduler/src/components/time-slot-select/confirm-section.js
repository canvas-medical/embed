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
} from '@canvas/common'
import { useAppContext } from '../../hooks'
import axios from 'axios'

export const ConfirmSection = ({ onCancel }) => {
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
  } = useAppContext()

  const handleConfirmation = () => {
    axios
      .post(`${api}/Appointment`, {
        body: {
          appointmentType: {
            coding: [
              {
                code: `${appointmentTypeCode}`,
              },
            ],
          },
          description: `${reason}`,
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
                reference: `Patient/${patientId}`,
              },
            },
            {
              actor: {
                reference: `Practitioner/${timeSlot.provider.id}`,
              },
            },
          ],
        },
      })
      .then(() => setScreen('CONFIRM'))
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
          <strong>{`${formatDate(date)} at ${timeSlot.start}`}</strong>
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
          onClick={() => handleConfirmation()}
        >
          Confirm
        </Button>
        <OutlineButton onClick={onCancel}>Cancel</OutlineButton>
      </PopoverButtons>
    </Box>
  )
}
