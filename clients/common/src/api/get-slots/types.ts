import {
  IFHIRResponse,
  HandleErrorType,
  SetLoadingType,
  SetTimeSlotsType,
  ProvidersType,
} from '../../utils'

export type GetSlotsParamsType = {
  setLoading: SetLoadingType
  onError: HandleErrorType
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
  onTimeslotLoad: () => void
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
  onError: HandleErrorType
  api: string
  patientId: string
  patientKey: string
  providerIds: string[]
  setProviders: (providers: ProvidersType[]) => void
  onTimeslotLoad: () => void
}
