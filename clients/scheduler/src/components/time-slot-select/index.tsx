import { h } from 'preact'
import { isSameDay, ParsedSlotsType, SlotType } from '@canvas-medical/embed-common'
import { useState, useEffect, useMemo, useCallback } from 'preact/hooks'
import { useAppContext } from '../../hooks'
import { Ui } from './ui'

export const TimeSlotSelect = () => {
  const { fetchTimeSlots, date, setDate } = useAppContext()
  const [providerTimeSlots, setProviderTimeSlots] = useState<ParsedSlotsType[]>([])

  const addTimeSlots = useCallback((newProviderTimeSlots: ParsedSlotsType[]) => {
    const mergedProviderAvailability = newProviderTimeSlots.map((newProvider) => {
      const provider = providerTimeSlots.find((entry) => entry.providerId === newProvider.providerId)
      const mergedSlots = provider ? [...provider.providerSlots, ...newProvider.providerSlots] : newProvider.providerSlots
      return {providerId: newProvider.providerId, providerSlots: mergedSlots}
    })

    setProviderTimeSlots(mergedProviderAvailability)
  }, [providerTimeSlots])

  const {minDate, maxDate} = useMemo(() => {
    const slots: SlotType[] = []
    providerTimeSlots.forEach((providerTimeSlot) => {
      slots.push(...providerTimeSlot.providerSlots)
    })

    if (slots.length === 0) {
      return {minDate: undefined, maxDate: undefined}
    }

    slots.sort((a, b) => {
      const startA = new Date(a.start)
      const startB = new Date(b.start)

      return startA > startB ? 1 : startA < startB ? -1 : 0;
    })

    const minDate = new Date(slots[0].start)
    const maxDate = new Date(slots[slots.length - 1].start)

    return {minDate, maxDate}
  }, [providerTimeSlots])

  useEffect(() => {
    if (typeof maxDate === "undefined" || date >= maxDate) {
      fetchTimeSlots(addTimeSlots)
    }
  }, [date])

  const dayOfTimeSlots = useMemo(() => {
    return providerTimeSlots.map((provider) => {
      return {
        providerId: provider.providerId,
        providerSlots: provider.providerSlots.filter((slot) => {
          return isSameDay(new Date(slot.start), date)
        })
      }
    })
  }, [date, providerTimeSlots])

  useEffect(() => {
    if (typeof minDate !== "undefined" && date < minDate) {
      setDate(minDate)
    }
  }, [minDate, setDate])

  return <Ui timeSlots={dayOfTimeSlots} />
}
