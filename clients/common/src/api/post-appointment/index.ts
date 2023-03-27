import axios from 'axios'
import { statuses } from '../../utils'
import { constructBody } from '../construct-body'
import { PostAppointmentParamsType } from './types'

export const postAppointment = ({
  setScreen,
  onError,
  setLoading,
  appointmentCoding,
  description,
  locationId,
  timeSlot,
  patientId,
  patientKey,
  api,
}: PostAppointmentParamsType) => {
  setLoading(true)

  const body = constructBody({
    status: statuses.booked,
    appointmentCoding,
    description,
    locationId,
    timeSlot,
    patientId,
  })

  const data =
    api.indexOf('canvasmedical.com') === -1 ? body : JSON.stringify(body)

  axios
    .post(`${api}/Appointment`, data, {
      params: {
        patient: patientId,
        patient_key: patientKey,
      },
    })
    .then(() => {
      setScreen()
      setLoading(false)
    })
    .catch(e => onError(e, 'Error Creating Appointment'))
}
