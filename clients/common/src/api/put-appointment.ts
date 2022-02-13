import axios from 'axios'
import { statuses, TimeSlotType, TreatmentType } from '../utils'
import { constructAppointmentBody } from './construct-appointment-body'

export const putAppointment = (
  onComplete: Function,
  setError: Function,
  setLoading: Function,
  treatment: TreatmentType,
  reason: string,
  locationId: string,
  timeSlot: TimeSlotType,
  patientId: string,
  patientKey: string,
  api: string,
  appointmentId: string
) => {
  setLoading(true)
  const data = constructAppointmentBody(
    statuses.cancelled,
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
    .then(() => onComplete())
    .catch(() => setError('Error Cancelling Appointment'))
}
