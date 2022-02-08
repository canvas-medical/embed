import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { getTimeSlots } from '@canvas/common'
import { useAppContext } from '../../hooks'
import { Ui } from './ui'

export const TimeSlotSelect = () => {
  const {
    api,
    date,
    locationId,
    providers,
    patientId,
    patientKey,
    duration,
    setError,
  } = useAppContext()
  const [loading, setLoading] = useState(true)
  const [timeSlots, setTimeSlots] = useState([])

  useEffect(() => {
    getTimeSlots(
      setLoading,
      setError,
      providers,
      api,
      locationId,
      patientId,
      patientKey,
      date,
      duration,
      setTimeSlots
    )
  }, [
    api,
    date,
    duration,
    locationId,
    patientId,
    patientKey,
    providers,
    setError,
  ])

  return <Ui loading={loading} timeSlots={timeSlots} />
}
