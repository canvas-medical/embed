import axios from 'axios'
import { formatDateForAPI } from '../utils'

const findAppointment = (
  appointments,
  timeSlot,
  setAppointmentId,
  setError,
  setLoading
) => {
  const appointment = appointments.entry.find(({ resource }) => {
    return (
      new Date(resource.start).toISOString() ===
        new Date(timeSlot.start).toISOString() &&
      new Date(resource.end).toISOString() ===
        new Date(timeSlot.end).toISOString()
    )
  })?.resource?.id

  if (appointment) {
    setAppointmentId(appointment)
    setLoading(false)
  } else {
    setError('Error Fetching Appointment')
  }
}

export const getScheduledAppointment = (
  setLoading,
  setError,
  setAppointmentId,
  api,
  patientId,
  patientKey,
  date,
  timeSlot
) => {
  setLoading(true)
  axios
    .get(`${api}/Appointment`, {
      params: {
        patient: patientId,
        patient_key: patientKey,
        date: `ge${formatDateForAPI(date)}`,
        practitioner: timeSlot.provider.id,
      },
    })
    .then(response =>
      findAppointment(
        response.data,
        timeSlot,
        setAppointmentId,
        setError,
        setLoading
      )
    )
    .catch(() => setError('Error Fetching Appointment'))
}
