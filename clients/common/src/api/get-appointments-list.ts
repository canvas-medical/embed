import axios from 'axios'
import {
  AppointmentType,
  formatDateForAPI,
  ProvidersType,
  statuses,
} from '../utils'

const parseAppointments = (
  responses: any,
  setAppointments: Function,
  setLoading: Function
) => {
  const appointments: AppointmentType[] = []

  console.log(responses)
  // @ts-ignore
  responses.forEach(response => {
    if (response.slots.total > 0) {
      // @ts-ignore
      response.slots.entry.map(({ resource }) => {
        if (resource.status !== statuses.cancelled) {
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

export const getAppointmentsList = (
  setLoading: Function,
  setError: Function,
  setAppointments: Function,
  providers: ProvidersType[],
  api: string,
  patientId: string,
  patientKey: string
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
