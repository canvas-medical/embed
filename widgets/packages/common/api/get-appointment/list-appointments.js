import axios from 'axios'
import { formatDateForAPI, STATUS } from '../../utils'

const parseAppointments = (responses, setAppointments, setLoading) => {
  const appointments = []

  console.log(responses)
  responses.forEach(response => {
    if (response.slots.total > 0) {
      response.slots.entry.map(({ resource }) => {
        if (resource.status !== STATUS.CANCELLED) {
          appointments.push({
            id: resource.id,
            provider: response.provider,
            start: resource.start,
            end: resource.end,
            type: resource.appointmentType.coding[0].code,
            reason: resource.reasonCode[0].text,
          })
        }
      })
    }
  })
  setAppointments(appointments)
  setLoading(false)
}

export const listAppointments = (
  setLoading,
  setError,
  setAppointments,
  providers,
  api,
  patientId,
  patientKey
) => {
  setLoading(true)
  Promise.all(
    providers.map(provider => {
      return axios
        .get(`${api}/Appointment`, {
          params: {
            practitioner: provider.id,
            patient: patientId,
            patient_key: patientKey,
            date: `ge${formatDateForAPI(new Date())}`,
          },
        })
        .then(response => {
          return { provider, slots: response.data }
        })
    })
  )
    .then(responses =>
      parseAppointments(responses, setAppointments, setLoading)
    )
    .catch(() => setError('Error Fetching Appointments'))
}
