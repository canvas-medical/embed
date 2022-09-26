export * from './application'

export type PatientType = {
  email: string
  name: string
}

export type ProvidersType = {
  name?: string
  id: string
}

export type SlotType = {
  start: string
  end: string
}

export type ParsedSlotsType = {
  providerId: string
  providerSlots: SlotType[]
}

export type TreatmentType = {
  type: string
  code: string
}

export type TimeSlotType = {
  start: string
  end: string
  provider: ProvidersType
}

export type AppointmentType = {
  id: string
  code: string
  description: string
  display: string
  locationId?: string
  patient?: PatientType
  providerId: string
  start: string
  end: string
}

export type AppointmentCodingType = {
  system?: string
  code?: string
  display?: string
}
