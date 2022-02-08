import axios from 'axios'
import { STATUS } from '../utils'
import { constructAppointmentBody } from './construct-appointment-body'

export const putAppointment = (
  returnURL,
  setError,
  setLoading,
  appointmentTypeCode,
  treatment,
  reason,
  locationId,
  timeSlot,
  patientId,
  patientKey,
  api,
  appointmentId
) => {
  setLoading(true)
  const data = constructAppointmentBody(
    STATUS.CANCELLED,
    appointmentTypeCode,
    treatment,
    reason,
    locationId,
    timeSlot,
    patientId
  )

  axios
    .put(`${api}/Appointment/${appointmentId}`, JSON.stringify(data), {
      params: {
        patient: patientId,
        patient_key: patientKey,
      },
    })
    .then(() => (window.location = returnURL))
    .catch(() => setError('Error Cancelling Appointment'))
}
