import { h } from 'preact'
import { ParsedSlotsType } from '@canvas-medical/embed-common'
import { useState, useEffect } from 'preact/hooks'
import { useAppContext } from '../../hooks'
import { Ui } from './ui'

export const TimeSlotSelect = () => {
  const { fetchTimeSlots, date } = useAppContext()
  const [timeSlots, setTimeSlots] = useState<ParsedSlotsType[]>([])

  useEffect(() => {
    fetchTimeSlots(setTimeSlots)
  }, [date])

  return <Ui timeSlots={timeSlots} />
}
