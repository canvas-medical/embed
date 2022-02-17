import axios from 'axios'
import {
  isSameDay,
  ParsedSlotsType,
  SetLoadingType,
  SlotType,
} from '../../utils'
import {
  GetSlotsParamsType,
  GetSlotsResponseType,
  ParseSlotsResponsesType,
} from './types'

const parseSlots = (
  responses: ParseSlotsResponsesType,
  setLoading: SetLoadingType,
  date: Date,
  setTimeSlots: Function
): void => {
  const slots: ParsedSlotsType[] = []
  responses.forEach((response: any) => {
    const providerSlots: SlotType[] = []
    const totalSlots = response.slots.total || -1
    for (let i = 0; i < totalSlots; i++) {
      if (
        response.slots.entry &&
        isSameDay(new Date(response.slots.entry[i].resource.start), date)
      ) {
        providerSlots.push({
          start: response.slots.entry[i].resource.start,
          end: response.slots.entry[i].resource.end,
        })
      } else {
        i = totalSlots
      }
    }
    slots.push({ providerId: response.providerId, providerSlots })
  })
  setTimeSlots(slots)
  setLoading(false)
}

export const getTimeSlots = ({
  setLoading,
  setError,
  setTimeSlots,
  api,
  date,
  duration,
  locationId,
  patientId,
  patientKey,
  providerIds,
}: GetSlotsParamsType) => {
  setLoading(true)

  Promise.all(
    providerIds.map(providerId => {
      return axios
        .get<GetSlotsResponseType>(`${api}/Slot`, {
          params: {
            schedule: `Schedule/Location.${locationId}-Staff.${providerId}`,
            patient: patientId,
            patient_key: patientKey,
            start: date.toISOString(),
            duration,
          },
        })
        .then(response => {
          return { providerId, slots: response.data || [] }
        })
    })
  )
    .then(responses => parseSlots(responses, setLoading, date, setTimeSlots))
    .catch(() => setError('Error Fetching Appointments'))
}
