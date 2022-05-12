import { h } from 'preact'
import { isSameDay, ParsedSlotsType } from '@canvas-medical/embed-common'
import { useState, useEffect, useMemo, useCallback } from 'preact/hooks'
import { useAppContext } from '../../hooks'
import { Ui } from './ui'

export const TimeSlotSelect = () => {
  const { fetchTimeSlots, date } = useAppContext()
  const [providerTimeSlots, setProviderTimeSlots] = useState<ParsedSlotsType[]>([])

  const addTimeSlots = useCallback((newProviderTimeSlots: ParsedSlotsType[]) => {
    const mergedProviderAvailability = newProviderTimeSlots.map((newProvider) => {
      const provider = providerTimeSlots.find((entry) => entry.providerId === newProvider.providerId)
      const mergedSlots = provider ? [...provider.providerSlots, ...newProvider.providerSlots] : newProvider.providerSlots
      return {providerId: newProvider.providerId, providerSlots: mergedSlots}
    })

    setProviderTimeSlots(mergedProviderAvailability)
  }, [providerTimeSlots])

  // Determine max date available for all providers
  const maxDate = useMemo(() => {
    if (providerTimeSlots.length === 0) {
      return
    }

    const providersMaxDates = providerTimeSlots.map((provider) => {
      if (provider.providerSlots.length === 0) {
        return undefined
      }

      return provider.providerSlots.reduce((a, b) => {
        return new Date(a.start) > new Date(b.start) ? a : b;
      })
    })

    const maxDateSlot = providersMaxDates.reduce((a, b) => {
      if (!a && !b) {
        return undefined
      } else if (!a) {
        return b
      } else if (!b) {
        return a
      }

      return new Date(a.start) > new Date(b.start) ? a : b;
    })

    if (maxDateSlot) {
      return new Date(maxDateSlot.start)
    }
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

  return <Ui timeSlots={dayOfTimeSlots} />
}
