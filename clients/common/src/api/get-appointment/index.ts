import axios from 'axios'
import { formatDateForAPI, checkDateTimeMatch } from '../../utils'
import { IGetAppointmentResponseType } from '../types'
import { FindAppointmentParamsType, GetAppointmentParamsType } from './types'

export const findAppointment = ({
  setLoading,
  setError,
  setAppointmentId,
  appointments,
  timeSlot,
}: FindAppointmentParamsType) => {
  const appointment = appointments.entry.find(({ resource }) => {
    return (
      checkDateTimeMatch(resource.start, timeSlot.start) &&
      checkDateTimeMatch(resource.end, timeSlot.end)
    )
  })?.resource.id

  if (appointment) {
    setAppointmentId(appointment)
    setLoading(false)
  } else {
    setError('Error Fetching Appointment')
    setLoading(false)
  }
}

export const getScheduledAppointment = ({
  setLoading,
  setError,
  setAppointmentId,
  api,
  patientId,
  patientKey,
  date,
  timeSlot,
}: GetAppointmentParamsType) => {
  setLoading(true)
  axios
    .get<IGetAppointmentResponseType>(`${api}/Appointment`, {
      params: {
        patient: patientId,
        patient_key: patientKey,
        date: `ge${formatDateForAPI(date)}`,
        practitioner: timeSlot.provider.id,
      },
    })
    .then(response =>
      findAppointment({
        setLoading,
        setError,
        setAppointmentId,
        appointments: response.data,
        timeSlot,
      })
    )
    .catch(() => setError('Error Fetching Appointment'))
}
