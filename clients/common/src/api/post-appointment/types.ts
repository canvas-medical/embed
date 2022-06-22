import {
  AppointmentCodingType,
  TimeSlotType,
  HandleErrorType,
} from '../../utils'

export type PostAppointmentParamsType = {
  setScreen: () => void
  onError: HandleErrorType
  setLoading: (args: boolean) => void
  appointmentCoding: AppointmentCodingType
  description?: string
  locationId: string
  timeSlot: TimeSlotType
  patientId: string
  patientKey: string
  api: string
}
