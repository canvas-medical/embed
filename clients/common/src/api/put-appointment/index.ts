import axios from 'axios'
import { statuses } from '../../utils'
import { constructBody } from '../construct-body'
import { PutAppointmentParamsType } from './types'

export const putAppointment = ({
  onComplete,
  setError,
  setLoading,
  appointmentCoding,
  locationId,
  timeSlot,
  patientId,
  patientKey,
  api,
  appointmentId,
}: PutAppointmentParamsType) => {
  setLoading(true)
  const data = constructBody({
    status: statuses.cancelled,
    appointmentCoding,
    locationId,
    timeSlot,
    patientId,
  })

  axios
    .put(`${api}/Appointment/${appointmentId}`, data, {
      params: {
        patient: patientId,
        patient_key: patientKey,
      },
    })
    .then(() => {
      setLoading(false)
      onComplete()
    })
    .catch(() => setError('Error Cancelling Appointment'))
}
