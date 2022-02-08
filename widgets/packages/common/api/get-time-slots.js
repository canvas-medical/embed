import axios from 'axios'
import { isSameDay } from '../utils'

const parseSlots = (responses, setLoading, date, setTimeSlots) => {
  const slots = []
  responses.forEach(response => {
    const providerSlots = []
    const totalSlots = response.slots.total || -1
    for (let i = 0; i < totalSlots; i++) {
      if (isSameDay(new Date(response.slots.entry[i].resource.start), date)) {
        providerSlots.push({
          start: response.slots.entry[i].resource.start,
          end: response.slots.entry[i].resource.end,
        })
      } else {
        i = totalSlots
      }
    }
    slots.push({ provider: response.provider, providerSlots })
  })
  setTimeSlots(slots)
  setLoading(false)
}

export const getTimeSlots = (
  setLoading,
  setError,
  providers,
  api,
  locationId,
  patientId,
  patientKey,
  date,
  duration,
  setTimeSlots
) => {
  setLoading(true)
  Promise.all(
    providers.map(provider => {
      return axios
        .get(`${api}/Slot`, {
          params: {
            schedule: `Schedule/Location.${locationId}-Staff.${provider.id}`,
            patient: patientId,
            patient_key: patientKey,
            start: date.toISOString(),
            duration,
          },
        })
        .then(response => {
          return { provider, slots: response.data }
        })
    })
  )
    .then(responses => parseSlots(responses, setLoading, date, setTimeSlots))
    .catch(() => setError('Error Fetching Appointments'))
}
