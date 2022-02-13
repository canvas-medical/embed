import { h, createContext, ComponentChildren } from 'preact'
import { useState, useMemo, useContext, useCallback } from 'preact/hooks'
import {
  generateColors,
  getScheduledAppointment,
  getTimeSlots,
  postAppointment,
  putAppointment,
  TimeSlotType,
} from '@canvas/embed-common'
import { iAppContext } from '../utils'

type ContextWrapperProps = {
  children: ComponentChildren
  values: iAppContext
}

export const AppContext = createContext<iAppContext>({
  api: '',
  bailoutURL: '',
  duration: 20,
  locationId: '',
  patientId: '',
  patientKey: '',
  providers: [],
  reason: '',
  returnURL: '',
  colors: generateColors(null, null),
  treatment: {
    type: '',
    code: '',
  },
  shadowRoot: null,
  date: new Date(),
  setDate: () => {},
  loading: false,
  screen: 'SELECT',
  timeSlot: {
    start: '',
    end: '',
    provider: {
      name: '',
      id: '',
    },
  },
  setTimeSlot: () => {},
  resetTimeSlot: () => {},
  fetchTimeSlots: () => {},
  fetchScheduledAppointment: () => {},
  createAppointment: () => {},
  cancelAppointment: () => {},
})

export const ContextWrapper = ({ children, values }: ContextWrapperProps) => {
  const [screen, setScreen] = useState<string>('SELECT')
  const [date, setDate] = useState<Date>(new Date())
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [timeSlot, setTimeSlot] = useState<TimeSlotType>({
    start: '',
    end: '',
    provider: {
      name: '',
      id: '',
    },
  })

  const resetTimeSlot = () => {
    setTimeSlot({
      start: '',
      end: '',
      provider: {
        name: '',
        id: '',
      },
    })
  }

  const fetchTimeSlots = useCallback(
    (setTimeSlots: Function) => {
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

  const fetchScheduledAppointment = useCallback(
    (setAppointmentId: Function) => {
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

  const createAppointment = useCallback(() => {
    postAppointment(
      () => setScreen('CONFIRM'),
      setError,
      setLoading,
      values.treatment,
      values.reason,
      values.locationId,
      timeSlot,
      values.patientId,
      values.patientKey,
      values.api
    )
  }, [timeSlot, values])

  const cancelAppointment = useCallback(
    (appointmentId: string, onComplete: Function) => {
      putAppointment(
        onComplete,
        setError,
        setLoading,
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
      date,
      setDate,
      error,
      loading,
      timeSlot,
      setTimeSlot,
      resetTimeSlot,
      fetchTimeSlots,
      fetchScheduledAppointment,
      createAppointment,
      cancelAppointment,
    }
  }, [screen, date, loading, error, timeSlot])

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)
