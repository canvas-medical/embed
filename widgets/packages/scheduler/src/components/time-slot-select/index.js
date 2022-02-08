import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { useAppContext } from '../../hooks'
import { Ui } from './ui'

export const TimeSlotSelect = () => {
  const { handleTimeSlots } = useAppContext()
  const [loading, setLoading] = useState(true)
  const [timeSlots, setTimeSlots] = useState([])

  useEffect(() => {
    handleTimeSlots(setLoading, setTimeSlots)
  }, [handleTimeSlots])

  return <Ui loading={loading} timeSlots={timeSlots} />
}
