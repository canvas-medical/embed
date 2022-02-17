export * from './application'

export type ProvidersType = {
  name?: string
  id: string
}

export type SlotType = {
  start: string
  end: string
}

export type ParsedSlotsType = {
  provider: ProvidersType
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
  display: string
  providerId: string
  start: string
  end: string
}

export type AppointmentCodingType = {
  system: string | null
  code: string | null
  display: string | null
}
