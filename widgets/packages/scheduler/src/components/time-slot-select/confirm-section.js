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
    patientKey,
    setError,
  } = useAppContext()

  const data = {
    resource: {
      resourceType: 'Appointment',
      status: 'booked',
      appointmentType: {
        coding: [
          {
            stystem: 'http://snomed.info/sct',
            code: `${appointmentTypeCode}`,
            display: treatment,
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

  const handleConfirmation = () => {
    axios
      .post(`${api}/Appointment`, JSON.stringify(data), {
        params: {
          patient: patientId,
          patient_key: patientKey,
        },
      })
      .then(() => setScreen('CONFIRM'))
      .catch(() => setError('Error Creatinug Appointment'))
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
          onClick={() => handleConfirmation()}
        >
          Confirm
        </Button>
        <OutlineButton onClick={onCancel}>Cancel</OutlineButton>
      </PopoverButtons>
    </Box>
  )
}
