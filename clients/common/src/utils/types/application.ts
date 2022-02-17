import { AppointmentType, ProvidersType, TimeSlotType } from '.'

export interface IFHIRResponse {
  resourceType: string
  type: string
  total: number
}

export type SetLoadingType = (loading: boolean) => void

export type ErrorType = string | string[] | null

export type SetErrorType = (errors: string | string[]) => void

export type SetTimeSlotsType = (
  provider: ProvidersType,
  providerSlots: TimeSlotType[]
) => void

export type SetAppointmentsParamsType = {
  appointments: AppointmentType[]
  providers: string[]
}
