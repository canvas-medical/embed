import { AppointmentType, ParsedSlotsType, TimeSlotType } from '.'
import type { AxiosError } from 'axios'

export interface IFHIRResponse {
  resourceType: string
  type: string
  total: number
}

export type SetLoadingType = (loading: boolean) => void

export type ErrorType = string | string[] | null

export type HandleErrorType = (
  error: AxiosError | Error | null,
  errors?: ErrorType
) => void

export type TimeSlotsType = {
  providerId: string
  providerSlots: TimeSlotType[]
}

export type SetTimeSlotsType = (timeSlots: ParsedSlotsType[]) => void

export type SetAppointmentsParamsType = {
  appointments: AppointmentType[]
  providers: string[]
}
