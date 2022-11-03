import { Fragment } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import {
  Loader,
  Popover,
  ProvidersType,
  ParsedSlotsType,
} from '@canvas-medical/embed-common'
import { useAppContext } from '../../hooks'
import { TimeSlots } from './time-slots'
import { findProvider } from '../../utils/functions'

type UiPropsType = {
  timeSlots: ParsedSlotsType[]
}

type SelectTimeSlotType = {
  start: string
  end: string
  provider: ProvidersType
}

export const TimeSlotUi = ({ timeSlots }: UiPropsType) => {
  const {
    colors,
    date,
    timeSlot,
    setTimeSlot,
    preloadBooking,
    loading,
    providers,
  } = useAppContext()

  useEffect(() => {
    if (preloadBooking && preloadBooking.start && preloadBooking.start !== timeSlot.start) {
      const bookDate = new Date(preloadBooking.start)
      // If there's pre-booking data that hasn't been set yet
      if (bookDate.getTime() === date.getTime()) {
        selectTimeSlot(preloadBooking)
      }
    }
  }, [date])

  const selectTimeSlot = ({ start, end, provider }: SelectTimeSlotType) => {
    setTimeSlot({
      start,
      end,
      provider,
    })
  }

  if (!providers.length || loading) {
    return <Loader colors={colors} />
  }

  return (
    <Fragment>
      {timeSlots.map(({ providerId, providerSlots }) => {
        return (
          <TimeSlots
            key={providerId}
            provider={findProvider(providerId, providers)}
            slots={providerSlots}
            selectTimeSlot={selectTimeSlot}
          />
        )
      })}
    </Fragment>
  )
}
