import axios from 'axios'
import { statuses, TreatmentType, TimeSlotType } from '../utils'
import { constructAppointmentBody } from './construct-appointment-body'

export const postAppointment = (
  setScreen: Function,
  setError: Function,
  setLoading: Function,
  treatment: TreatmentType,
  reason: string,
  locationId: string,
  timeSlot: TimeSlotType,
  patientId: string,
  patientKey: string,
  api: string
) => {
  setLoading(true)
  const data = constructAppointmentBody(
    statuses.booked,
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
    .then(() => {
      setScreen()
      setLoading(false)
    })
    .catch(() => setError('Error Creating Appointment'))
}
