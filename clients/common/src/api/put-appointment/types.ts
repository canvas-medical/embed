import {
  AppointmentCodingType,
  SetErrorType,
  SetLoadingType,
  TimeSlotType,
} from '../../utils'

export type PutAppointmentParamsType = {
  onComplete: () => void
  setError: SetErrorType
  setLoading: SetLoadingType
  appointmentCoding: AppointmentCodingType
  description?: string
  locationId: string
  timeSlot: TimeSlotType
  patientId: string
  patientKey: string
  api: string
  appointmentId: string
}
