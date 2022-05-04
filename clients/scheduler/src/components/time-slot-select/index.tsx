import { h } from 'preact'
import { isSameDay, ParsedSlotsType } from '@canvas-medical/embed-common'
import { useState, useEffect } from 'preact/hooks'
import { useAppContext } from '../../hooks'
import { Ui } from './ui'

export const TimeSlotSelect = () => {
  const { fetchTimeSlots, date } = useAppContext()
  const [timeSlots, setTimeSlots] = useState<ParsedSlotsType[]>([])
  const [dayOfTimeSlots, setDayOfTimeSlots] = useState<ParsedSlotsType[]>([])
  const [maxDate, setMaxDate] = useState<Date>(date)

  const addTimeSlots = (newSlots: ParsedSlotsType[]) => {
    const udpatedSlots = newSlots.map((newSlot) => {
      const existingProvider = timeSlots.find((timeSlot) => timeSlot.providerId === newSlot.providerId)
      const mergedSlots = existingProvider ? [...existingProvider.providerSlots, ...newSlot.providerSlots] : newSlot.providerSlots
      return {providerId: newSlot.providerId, providerSlots: mergedSlots}
    })
    setTimeSlots(udpatedSlots)
  }

  useEffect(() => {
    if (date >= maxDate) {
      fetchTimeSlots(addTimeSlots)
    }
  }, [date])

  useEffect(() => {
    setDayOfTimeSlots(timeSlots.map((provider) => {
      return {
        providerId: provider.providerId,
        providerSlots: provider.providerSlots.filter((slot) => {
          return isSameDay(new Date(slot.start), date)
        })
      }
    }))
  }, [date, timeSlots])

  // Determine max date available for all providers
  useEffect(() => {
    if (timeSlots.length === 0) {
      return
    }

    const providersMaxDates = timeSlots.map((provider) => {
      if (provider.providerSlots.length === 0) {
        return undefined
      }

      return provider.providerSlots.reduce((a, b) => {
        return new Date(a.start) > new Date(b.start) ? a : b;
      })
    })

    const maxDateSlot = providersMaxDates.reduce((a, b) => {
      if (!a || !b) {
        return undefined
      }

      return new Date(a.start) > new Date(b.start) ? a : b;
    })

    if (maxDateSlot) {
      setMaxDate(new Date(maxDateSlot.start))
    }
  }, [timeSlots])



  return <Ui timeSlots={dayOfTimeSlots} />
}
