import { h } from 'preact'
import { useCallback, useEffect, useState } from 'preact/hooks'
import axios from 'axios'
import { useAppContext } from '../../hooks'
import { Ui } from './ui'

export const TimeSlotSelect = () => {
  const { api, date, locationId, providers, patientId, patientKey } =
    useAppContext()
  const [loading, setLoading] = useState(true)
  const [timeSlots, setTimeSlots] = useState([])

  const isSameDay = useCallback(
    queryDate => {
      const parsedDate = new Date(queryDate)

      return (
        date.getDate() === parsedDate.getDate() &&
        date.getMonth() === parsedDate.getMonth() &&
        date.getFullYear() === parsedDate.getFullYear()
      )
    },
    [date]
  )

  const fetchSlots = useCallback(() => {
    return providers.map(provider => {
      return axios
        .get(`${api}/Slot`, {
          params: {
            schedule: `Schedule/Location.${locationId}-Staff.${provider.id}`,
            patient: patientId,
            patient_key: patientKey,
            start: date.toISOString(),
          },
        })
        .then(response => {
          return { provider, slots: response.data }
        })
    })
  }, [api, date, locationId, patientId, patientKey, providers])

  const parseSlots = useCallback(
    data => {
      console.log(data)
      const slots = []
      data.forEach(datum => {
        const providerSlots = []
        const totalSlots = datum.slots.total || -1
        for (let i = 0; i < totalSlots; i++) {
          if (isSameDay(datum.slots.entry[i].resource.start)) {
            providerSlots.push({
              start: datum.slots.entry[i].resource.start,
              end: datum.slots.entry[i].resource.start,
            })
          } else {
            i = totalSlots
          }
        }
        slots.push({ provider: datum.provider, providerSlots })
      })
      setTimeSlots(slots)
      setLoading(false)
    },
    [isSameDay]
  )

  useEffect(() => {
    setLoading(true)
    Promise.all(fetchSlots())
      .then(response => parseSlots(response))
      .catch(response => console.log(response))
  }, [date, fetchSlots, parseSlots])

  return <Ui loading={loading} timeSlots={timeSlots} />
}
