import axios from 'axios'
import { statuses } from '../../utils'
import { constructBody } from '../construct-body'
import { PutAppointmentParamsType } from './types'

export const putAppointment = ({
  onComplete,
  onError,
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

  const body = constructBody({
    id: appointmentId,
    status: statuses.cancelled,
    appointmentCoding,
    locationId,
    timeSlot,
    patientId,
  })

  const data =
    api.indexOf('canvasmedical.com') === -1 ? body : JSON.stringify(body)

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
    .catch(e => onError(e, 'Error Cancelling Appointment'))
}
