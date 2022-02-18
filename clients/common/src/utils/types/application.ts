import {
  AppointmentType,
  ParsedSlotsType,
  ProvidersType,
  TimeSlotType,
} from '.'

export interface IFHIRResponse {
  resourceType: string
  type: string
  total: number
}

export type SetLoadingType = (loading: boolean) => void

export type ErrorType = string | string[] | null

export type SetErrorType = (errors: string | string[]) => void

export type TimeSlotsType = {
  providerId: string
  providerSlots: TimeSlotType[]
}

export type SetTimeSlotsType = (timeSlots: ParsedSlotsType[]) => void

export type SetAppointmentsParamsType = {
  appointments: AppointmentType[]
  providers: string[]
}
