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
  const data = constructBody({
    status: statuses.booked,
    appointmentCoding,
    description,
    locationId,
    timeSlot,
    patientId,
  })

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
