import { h, createContext, ComponentChildren } from 'preact'
import { useState, useMemo, useContext, useCallback } from 'preact/hooks'
import {
  generateColors,
  getTimeSlots,
  postAppointment,
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
  handleCreateAppointment: () => {},
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

  const handleCreateAppointment = useCallback(() => {
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

  const contextValue = useMemo(() => {
    return {
      ...values,
      screen,
      setScreen,
      date,
      setDate,
      loading,
      setLoading,
      error,
      setError,
      timeSlot,
      setTimeSlot,
      resetTimeSlot,
      fetchTimeSlots,
      handleCreateAppointment,
    }
  }, [screen, date, loading, error, timeSlot])

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)
