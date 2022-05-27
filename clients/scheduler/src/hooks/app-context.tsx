import { h, createContext, ComponentChildren } from 'preact'
import { useState, useMemo, useContext, useCallback } from 'preact/hooks'
import {
  generateColors,
  getScheduledAppointment,
  getTimeSlots,
  postAppointment,
  ProvidersType,
  putAppointment,
  SetTimeSlotsType,
  TimeSlotType,
} from '@canvas-medical/embed-common'
import { IAppContext } from '../utils'

type ContextWrapperProps = {
  children: ComponentChildren
  values: IAppContext
}

export const AppContext = createContext<IAppContext>({
  api: '',
  appointmentBufferInMintues: 60,
  appointmentCoding: {},
  bailoutURL: '',
  daysToFetch: 7,
  duration: 20,
  locationId: '',
  patientId: '',
  patientKey: '',
  providerIds: [],
  description: '',
  returnURL: '',
  colors: generateColors(null, null),
  shadowRoot: null,
  date: new Date(),
  setDate: () => {},
  error: '',
  loading: false,
  screen: 'SELECT',
  setScreen: () => {},
  providers: [],
  setProviders: () => {},
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
  const [error, setError] = useState<string | string[]>('')
  const [providers, setProviders] = useState<ProvidersType[]>([])
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
    (setTimeSlots: SetTimeSlotsType) => {
      getTimeSlots({
        setLoading,
        setError,
        providerIds: values.providerIds,
        api: values.api,
        locationId: values.locationId,
        patientId: values.patientId,
        patientKey: values.patientKey,
        date,
        duration: values.duration,
        setTimeSlots,
        setProviders,
        daysToFetch: values.daysToFetch,
      })
    },
    [date, values]
  )

  const fetchScheduledAppointment = useCallback(
    (setAppointmentId: (appointmentId: string) => void) => {
      getScheduledAppointment({
        setLoading,
        setError,
        setAppointmentId,
        api: values.api,
        patientId: values.patientId,
        patientKey: values.patientKey,
        date,
        timeSlot,
      })
    },
    [date, timeSlot, values]
  )

  const createAppointment = useCallback(() => {
    postAppointment({
      setScreen: () => setScreen('CONFIRM'),
      setError,
      setLoading,
      appointmentCoding: values.appointmentCoding,
      description: values.description,
      locationId: values.locationId,
      timeSlot,
      patientId: values.patientId,
      patientKey: values.patientKey,
      api: values.api,
    })
  }, [timeSlot, values])

  const cancelAppointment = useCallback(
    (appointmentId: string, onComplete: () => void) => {
      putAppointment({
        onComplete,
        setError,
        setLoading,
        appointmentCoding: values.appointmentCoding,
        description: values.description,
        locationId: values.locationId,
        timeSlot,
        patientId: values.patientId,
        patientKey: values.patientKey,
        api: values.api,
        appointmentId,
      })
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
      loading,
      providers,
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
