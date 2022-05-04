import axios from 'axios'
import { isSameDay, ParsedSlotsType, SlotType } from '../../utils'
import { getPractitioners } from '../get-practitioners'
import {
  GetSlotsParamsType,
  IGetSlotsResponse,
  ParseSlotsParamsType,
} from './types'

export const parseSlots = ({
  setLoading,
  responses,
  setTimeSlots,
  setError,
  setProviders,
  api,
  providerIds,
  patientId,
  patientKey,
}: ParseSlotsParamsType): void => {
  const slots: ParsedSlotsType[] = []
  responses.forEach((response: any) => {
    const providerSlots: SlotType[] = []
    const totalSlots = response.slots.total || -1
    for (let i = 0; i < totalSlots; i++) {
      if (response.slots.entry) {
        providerSlots.push({
          start: response.slots.entry[i].resource.start,
          end: response.slots.entry[i].resource.end,
        })
      } else {
        break
      }
    }
    slots.push({ providerId: response.providerId, providerSlots })
  })
  setTimeSlots(slots)

  getPractitioners({
    setLoading,
    setError,
    setProviders,
    api,
    providerIds,
    patientId,
    patientKey,
  })
}

export const getTimeSlots = ({
  setLoading,
  setError,
  setTimeSlots,
  api,
  date,
  daysToFetch,
  duration,
  locationId,
  patientId,
  patientKey,
  providerIds,
  setProviders,
}: GetSlotsParamsType) => {
  setLoading(true)

  Promise.all(
    providerIds.map(providerId => {
      const end = new Date(date.getTime() + daysToFetch * 86400000)
      return axios
        .get<IGetSlotsResponse>(`${api}/Slot`, {
          params: {
            schedule: `Schedule/Location.${locationId}-Staff.${providerId}`,
            patient: patientId,
            patient_key: patientKey,
            start: date.toISOString(),
            end: end.toISOString(),
            duration,
          },
        })
        .then(response => {
          return { providerId, slots: response.data || [] }
        })
    })
  )
    .then(responses =>
      parseSlots({
        setLoading,
        responses,
        setTimeSlots,
        setError,
        setProviders,
        api,
        providerIds,
        patientId,
        patientKey,
      })
    )
    .catch(() => setError('Error Fetching Appointments'))
}
