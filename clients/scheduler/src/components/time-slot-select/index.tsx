import {
  Body,
  isSameDay,
  ParsedSlotsType,
  SlotType,
} from '@canvas-medical/embed-common'
import { useState, useEffect, useMemo, useCallback } from 'preact/hooks'
import { useAppContext, usePreviousValue } from '../../hooks'
import { TimeSlotUi } from './ui'
import { DateSelect } from '../date-select'
import { findProvider } from '../../utils/functions'

const ONE_MINUTE_IN_MILLISECONDS = 60 * 1000

export const TimeSlotSelect = () => {
  const {
    fetchTimeSlots,
    date,
    setDate,
    appointmentBufferInMintues,
    preloadBooking,
    initialized,
    setInitialized,
    providers,
    callbacks,
    sortProviders,
  } = useAppContext()
  const [providerTimeSlots, setProviderTimeSlots] = useState<ParsedSlotsType[]>(
    []
  )
  const [datesViewed, setDatesViewed] = useState(0)

  const addTimeSlots = useCallback(
    (newProviderTimeSlots: ParsedSlotsType[]) => {
      const earliestAvailable = new Date()
      earliestAvailable.setTime(
        earliestAvailable.getTime() +
          appointmentBufferInMintues * ONE_MINUTE_IN_MILLISECONDS
      )

      const mergedProviderAvailability = newProviderTimeSlots.map(
        newProvider => {
          const provider = providerTimeSlots.find(
            entry => entry.providerId === newProvider.providerId
          )
          const availableSlots = newProvider.providerSlots.filter(
            slot => new Date(slot.start) >= earliestAvailable
          )
          const mergedSlots = provider
            ? [...provider.providerSlots, ...availableSlots]
            : availableSlots
          return {
            providerId: newProvider.providerId,
            providerSlots: mergedSlots,
          }
        }
      )

      setProviderTimeSlots(mergedProviderAvailability)

      if (!initialized) {
        setInitialized(true)
      }
    },
    [providerTimeSlots, initialized]
  )

  const { minDate, maxDate } = useMemo(() => {
    const slots: SlotType[] = []
    providerTimeSlots.forEach(providerTimeSlot => {
      slots.push(...providerTimeSlot.providerSlots)
    })

    if (slots.length === 0) {
      return { minDate: undefined, maxDate: undefined }
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

    return { minDate, maxDate }
  }, [providerTimeSlots])

  useEffect(() => {
    if (typeof maxDate === 'undefined' || date >= maxDate) {
      fetchTimeSlots(addTimeSlots)
    }
  }, [date])

  const dayOfTimeSlots = useMemo(() => {
    const sameDayTimeSlots = providerTimeSlots.map(provider => {
      return {
        providerId: provider.providerId,
        providerSlots: provider.providerSlots.filter(slot => {
          return isSameDay(new Date(slot.start), date)
        }),
      }
    })
    if (sortProviders) {
      sameDayTimeSlots.sort((a , b) => {
        return b.providerSlots.length - a.providerSlots.length
      })
    }
    return sameDayTimeSlots
  }, [date, providerTimeSlots])

  const previousInitializedValue = usePreviousValue(initialized)

  useEffect(() => {
    const hasSlots = dayOfTimeSlots.filter(({ providerSlots }) => providerSlots.length > 0).length > 0

    if ((hasSlots || previousInitializedValue) && initialized) {
      callbacks?.onDateChange?.({
        dayOfTimeSlots: dayOfTimeSlots.map(({ providerId, ...rest }) => ({
          ...rest,
          provider: findProvider(providerId, providers),
        })),
        isFirstDateViewed: datesViewed === 0,
        datesViewed,
        date,
      })

      setDatesViewed(datesViewed + 1)

    }
  }, [date])

  useEffect(() => {
    if (typeof minDate !== 'undefined' && date < minDate) {
      setDate(minDate)
    }
  }, [minDate, setDate])

  useEffect(() => {
    if (
      preloadBooking &&
      preloadBooking.start &&
      preloadBooking.end &&
      preloadBooking.provider.id
    ) {
      const bookDate = new Date(preloadBooking.start)
      // If there's pre-booking data that hasn't been set yet
      if (bookDate.getTime() !== date.getTime()) {
        setDate(bookDate)
      }
    }
  }, [preloadBooking])

  const enabledDates = useMemo(() => {
    const dateIsDisabled = new Set<string>()

    providerTimeSlots.forEach(provider => {
      provider.providerSlots.forEach(slot => {
        const slotDate = new Date(slot.start).toLocaleDateString()
        dateIsDisabled.add(slotDate)
      })
    })
    return dateIsDisabled
  }, [providerTimeSlots])

  return (
    <Body>
      <DateSelect enabledDates={enabledDates} maxDate={maxDate} />
      <TimeSlotUi timeSlots={dayOfTimeSlots} />
    </Body>
  )
}
