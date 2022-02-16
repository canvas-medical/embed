import { AppointmentCodingType, TimeSlotType } from '../../utils'

export type ConstructBodyParamsType = {
  appointmentCoding: AppointmentCodingType
  description: string | null
  locationId: string
  patientId: string
  status: string
  timeSlot: TimeSlotType
}
