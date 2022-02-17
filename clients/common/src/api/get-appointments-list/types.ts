import {
  AppointmentType,
  ProvidersType,
  SetErrorType,
  SetLoadingType,
} from '../../utils'
import { IGetAppointmentResponseType } from '../types'

export type ProviderAppointmentsType = {
  providerId: string
  appointments: IGetAppointmentResponseType
}[]

export type GetAppointmentsListParamsType = {
  setLoading: SetLoadingType
  setError: SetErrorType
  setAppointments: (appointments: AppointmentType[]) => void
  setProviders: (providers: ProvidersType[]) => void
  api: string
  date?: Date
  patientId: string
  patientKey: string
  providerIds?: string[]
}

export type ParseAppointmentsParamsType = {
  setLoading: SetLoadingType
  setError: SetErrorType
  setAppointments: (appointments: AppointmentType[]) => void
  setProviders: (providers: ProvidersType[]) => void
  api: string
  appointments?: IGetAppointmentResponseType
  providerAppointments?: ProviderAppointmentsType
  patientId: string
  patientKey: string
}
