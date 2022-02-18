import {
  IFHIRResponse,
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
  providerIds: string[]
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
  date: Date
  setTimeSlots: SetTimeSlotsType
}
