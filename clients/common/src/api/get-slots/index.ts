import axios from 'axios'
import { ParsedSlotsType, SlotType } from '../../utils'
import { getPractitioners } from '../get-practitioners'
import {
  GetSlotsParamsType,
  IGetSlotsResponse,
  ParseSlotsParamsType,
} from './types'

const DAYS_IN_MILLISECONDS = 86400000

export const parseSlots = ({
  setLoading,
  responses,
  setTimeSlots,
  onError,
  setProviders,
  api,
  providerIds,
  patientId,
  patientKey,
  onLoad,
  initialized,
  setInitialized,
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
    onError,
    setProviders,
    api,
    providerIds,
    patientId,
    patientKey,
    onLoad,
    initialized,
    setInitialized,
  })
}

export const getTimeSlots = ({
  setLoading,
  onError,
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
  onLoad,
  initialized,
  setInitialized,
}: GetSlotsParamsType) => {
  setLoading(true)

  Promise.all(
    providerIds.map(providerId => {
      const end = new Date(date.getTime() + daysToFetch * DAYS_IN_MILLISECONDS)
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
        onError,
        setProviders,
        api,
        providerIds,
        patientId,
        patientKey,
        onLoad,
        initialized,
        setInitialized,
      })
    )
    .catch(e => onError(e, 'Error Fetching Appointments'))
}
