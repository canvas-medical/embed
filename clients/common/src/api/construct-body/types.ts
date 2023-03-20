import { AppointmentCodingType, TimeSlotType } from '../../utils'

export type ConstructBodyParamsType = {
  appointmentCoding: AppointmentCodingType
  description?: string
  locationId: string
  patientId: string
  status: string
  timeSlot: TimeSlotType
  id?: string
}
