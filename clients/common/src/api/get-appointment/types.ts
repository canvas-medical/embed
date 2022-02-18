import { SetErrorType, SetLoadingType, TimeSlotType } from '../../utils'
import { IGetAppointmentResponseType } from '../types'

export type GetAppointmentParamsType = {
  setLoading: SetLoadingType
  setError: SetErrorType
  setAppointmentId: (args: string) => void
  api: string
  patientId: string
  patientKey: string
  date: Date
  timeSlot: TimeSlotType
}

export type FindAppointmentParamsType = {
  setLoading: SetLoadingType
  setError: SetErrorType
  setAppointmentId: (args: string) => void
  appointments: IGetAppointmentResponseType
  timeSlot: TimeSlotType
}
