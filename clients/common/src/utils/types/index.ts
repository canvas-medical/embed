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
