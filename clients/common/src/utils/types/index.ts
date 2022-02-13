export type ProvidersType = {
  name: string
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
