import { TimeSlotsType, TimeSlotType } from '@canvas-medical/embed-common'
import { h } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import { useAppContext } from '../../hooks'
import { Ui } from './ui'

export const TimeSlotSelect = () => {
  const { fetchProviders, fetchTimeSlots, providers } = useAppContext()
  const [timeSlots, setTimeSlots] = useState<TimeSlotsType[]>([])

  useEffect(() => {
    fetchProviders()
    fetchTimeSlots(setTimeSlots)
  }, [fetchProviders])

  return <Ui timeSlots={timeSlots} />
}
