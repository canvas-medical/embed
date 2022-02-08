import axios from 'axios'
import { STATUS } from '../utils'
import { constructAppointmentBody } from './construct-appointment-body'

export const postAppointment = (
  setScreen,
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
) => {
  setLoading(true)
  const data = constructAppointmentBody(
    STATUS.BOOKED,
    appointmentTypeCode,
    treatment,
    reason,
    locationId,
    timeSlot,
    patientId
  )

  axios
    .post(`${api}/Appointment`, JSON.stringify(data), {
      params: {
        patient: patientId,
        patient_key: patientKey,
      },
    })
    .then(() => setScreen())
    .catch(() => setError('Error Creating Appointment'))
}
