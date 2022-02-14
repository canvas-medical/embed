import { h } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import { useAppContext } from '../../hooks'
import { Ui } from './ui'

export const TimeSlotSelect = () => {
  const { fetchTimeSlots } = useAppContext()
  const [timeSlots, setTimeSlots] = useState([])

  useEffect(() => {
    fetchTimeSlots(setTimeSlots)
  }, [fetchTimeSlots])

  return <Ui timeSlots={timeSlots} />
}
