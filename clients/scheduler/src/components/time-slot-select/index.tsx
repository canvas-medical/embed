import { h } from 'preact'
import { Body, isSameDay, ParsedSlotsType, SlotType } from '@canvas-medical/embed-common'
import { useState, useEffect, useMemo, useCallback } from 'preact/hooks'
import { useAppContext } from '../../hooks'
import { TimeSlotUi } from './ui'
import { DateSelect } from '../date-select'

const ONE_MINUTE_IN_MILLISECONDS = 60*1000

export const TimeSlotSelect = () => {
  const { fetchTimeSlots, date, setDate, daysToFetch, appointmentBufferInMintues } = useAppContext()
  const [providerTimeSlots, setProviderTimeSlots] = useState<ParsedSlotsType[]>([])

  const addTimeSlots = useCallback((newProviderTimeSlots: ParsedSlotsType[]) => {
    const earliestAvailable = new Date();
    earliestAvailable.setTime(earliestAvailable.getTime() + (appointmentBufferInMintues*ONE_MINUTE_IN_MILLISECONDS));

    const mergedProviderAvailability = newProviderTimeSlots.map((newProvider) => {
      const provider = providerTimeSlots.find((entry) => entry.providerId === newProvider.providerId)
      const availableSlots = newProvider.providerSlots.filter(slot => new Date(slot.start) >= earliestAvailable)
      const mergedSlots = provider ? [...provider.providerSlots, ...availableSlots] : availableSlots
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

slots.sort((slot1, slot2) => {
  const slot1Start = new Date(slot1.start)
  const slot2Start = new Date(slot2.start)

  if (slot1Start > slot2Start) {
    return 1
  }

  if (slot1Start < slot2Start) {
    return -1
  }

  return 0
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

  const enabledDates = useMemo(() => {
    const dateIsDisabled = new Set<string>()

    providerTimeSlots.forEach((provider) => {
      provider.providerSlots.forEach(slot => {
        const slotDate = new Date(slot.start).toLocaleDateString()
        dateIsDisabled.add(slotDate)
      })
    })
    return dateIsDisabled;
  }, [providerTimeSlots])

  return (
    <Body>
      <DateSelect enabledDates={enabledDates} maxDate={maxDate} />
      <TimeSlotUi timeSlots={dayOfTimeSlots} />
    </Body>
    )
}
