import {
  ProvidersType,
  SetErrorType,
  SetLoadingType,
  SetTimeSlotsType,
} from '../../utils'

export type GetSlotsParamsType = {
  setLoading: SetLoadingType
  setError: SetErrorType
  setTimeSlots: SetTimeSlotsType
  api: string
  date: Date
  duration: number
  locationId: string
  patientId: string
  patientKey: string
  providers: ProvidersType[]
}

type SlotResourceType = {
  resource: {
    resourceType: string
    schedule: {
      reference: string
    }
    status: string
    start: string
    end: string
  }
}

export type GetSlotsResponseType = {
  resourceType: string
  type: string
  total: number
  entry?: SlotResourceType[]
}

export type ParseSlotsResponsesType = {
  provider: ProvidersType
  slots: GetSlotsResponseType
}[]
