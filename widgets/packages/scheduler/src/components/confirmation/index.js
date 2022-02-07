import { h } from 'preact'
import { useEffect } from 'preact/hooks'
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
    setScreen,
    timeSlot,
    treatment,
    date,
    locationId,
    patientId,
    api,
    patientKey,
  } = useAppContext()
  const today = new Date()

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

  useEffect(() => {
    console.log(`ge${formatDateForAPI(today)}`)
    axios
      .get(`${api}/Appointment`, {
        params: {
          patient: patientId,
          patient_key: patientKey,
          date: `ge${formatDateForAPI(today)}`,
        },
      })
      .then(response => console.log(response.data))
  }, [])

  const handleCancel = () => {
    axios
      .put(`${api}/Appointment`, JSON.stringify(data), {
        params: {
          patient: patientId,
          patient_key: patientKey,
        },
      })
      .then(() => console.log('CONFIRM'))
      .catch(() => setScreen('CONFIRM'))
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

      {/* This will eventually be some callback function or redirect */}
      <Button
        style={{ '--bg': colors.primary, '--mt': '32px' }}
        onClick={() => setScreen('SELECT')}
      >
        Finish
      </Button>
    </Box>
  )
}
