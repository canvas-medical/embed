import { AppointmentCodingType, TimeSlotType } from '../../utils'

export type PostAppointmentParamsType = {
  setScreen: () => void
  setError: (args: string) => void
  setLoading: (args: boolean) => void
  appointmentCoding: AppointmentCodingType
  description?: string
  locationId: string
  timeSlot: TimeSlotType
  patientId: string
  patientKey: string
  api: string
}
