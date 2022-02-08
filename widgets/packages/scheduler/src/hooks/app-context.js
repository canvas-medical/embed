import {
  getScheduledAppointment,
  getTimeSlots,
  postAppointment,
  putAppointment,
} from '@canvas/common'
import { h, createContext } from 'preact'
import { useContext, useState, useMemo, useCallback } from 'preact/hooks'

export const AppContext = createContext({
  api: null,
  appointmentTypeCode: null,
  bailoutURL: null,
  colors: {
    primary: null,
    accent: null,
    focus: null,
  },
  duration: null,
  locationId: null,
  patientId: null,
  patientKey: null,
  providerIds: null,
  reason: null,
  returnURL: null,
  shadowRoot: null,
  treatment: null,
})

export const ContextWrapper = ({ children, values }) => {
  const [screen, setScreen] = useState('SELECT')
  const [date, setDate] = useState(new Date())
  const [error, setError] = useState(null)
  const [timeSlot, setTimeSlot] = useState({
    start: null,
    end: null,
    provider: null,
  })

  const handleTimeSlots = useCallback(
    (setLoading, setTimeSlots) => {
      getTimeSlots(
        setLoading,
        setError,
        values.providers,
        values.api,
        values.locationId,
        values.patientId,
        values.patientKey,
        date,
        values.duration,
        setTimeSlots
      )
    },
    [date, values]
  )

  const handleScheduledAppointment = useCallback(
    (setLoading, setAppointmentId) => {
      getScheduledAppointment(
        setLoading,
        setError,
        setAppointmentId,
        values.api,
        values.patientId,
        values.patientKey,
        date,
        timeSlot
      )
    },
    [date, timeSlot, values]
  )

  const hanleCreateAppointment = useCallback(
    setLoading => {
      postAppointment(
        () => setScreen('CONFIRM'),
        setError,
        setLoading,
        values.appointmentTypeCode,
        values.treatment,
        values.reason,
        values.locationId,
        timeSlot,
        values.patientId,
        values.patientKey,
        values.api
      )
    },
    [timeSlot, values]
  )

  const handleCancelAppointment = useCallback(
    (setLoading, appointmentId) => {
      putAppointment(
        values.returnURL,
        setError,
        setLoading,
        values.appointmentTypeCode,
        values.treatment,
        values.reason,
        values.locationId,
        timeSlot,
        values.patientId,
        values.patientKey,
        values.api,
        appointmentId
      )
    },
    [timeSlot, values]
  )

  const contextValue = useMemo(() => {
    return {
      ...values,
      screen,
      setScreen,
      date,
      setDate,
      error,
      setError,
      timeSlot,
      setTimeSlot,
      handleTimeSlots,
      hanleCreateAppointment,
      handleScheduledAppointment,
      handleCancelAppointment,
    }
  }, [
    values,
    screen,
    date,
    error,
    timeSlot,
    handleTimeSlots,
    hanleCreateAppointment,
    handleScheduledAppointment,
    handleCancelAppointment,
  ])

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)
