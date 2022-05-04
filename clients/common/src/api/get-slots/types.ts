import {
  IFHIRResponse,
  SetErrorType,
  SetLoadingType,
  SetTimeSlotsType,
  ProvidersType,
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
  providerIds: string[]
  setProviders: (providers: ProvidersType[]) => void
  daysToFetch: number
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

export interface IGetSlotsResponse extends IFHIRResponse {
  entry?: SlotResourceType[]
}

export type ParseSlotsResponsesType = {
  providerId: string
  slots: IGetSlotsResponse
}[]

export type ParseSlotsParamsType = {
  setLoading: SetLoadingType
  responses: ParseSlotsResponsesType
  setTimeSlots: SetTimeSlotsType
  setError: SetErrorType
  api: string
  patientId: string
  patientKey: string
  providerIds: string[]
  setProviders: (providers: ProvidersType[]) => void
}
