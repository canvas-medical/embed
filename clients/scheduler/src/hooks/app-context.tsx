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
  HandleErrorType,
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
  callbacks: {
    onClick: () => {},
    onChange: () => {},
    onError: () => {},
  },
  daysToFetch: 7,
  duration: 20,
  locationId: '',
  patientId: '',
  patientKey: '',
  providerIds: [],
  preloadBooking: {
    start: '',
    end: '',
    provider: {
      id: '',
      name: ''
    }
  },
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

  const handleError: HandleErrorType = (error, msg) => {
    values.callbacks?.onError(error, msg)
    if (msg && typeof msg === 'string') setError(msg)
  }

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
        onError: handleError,
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
        onError: handleError,
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
      onError: handleError,
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
        onError: handleError,
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
