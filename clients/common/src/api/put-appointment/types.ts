import {
  AppointmentCodingType,
  HandleErrorType,
  SetLoadingType,
  TimeSlotType,
} from '../../utils'

export type PutAppointmentParamsType = {
  onComplete: () => void
  onError: HandleErrorType
  setLoading: SetLoadingType
  appointmentCoding: AppointmentCodingType
  description?: string
  locationId: string
  timeSlot: TimeSlotType
  patientId: string
  patientKey: string
  api: string
  appointmentId: string
  id?: string
}
