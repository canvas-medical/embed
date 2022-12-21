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
import { getPractitioners } from '@canvas-medical/embed-common/src/api/get-practitioners'

type ContextWrapperProps = {
  children: ComponentChildren
  values: IAppContext
}

const noOp = () => {}

export const AppContext = createContext<IAppContext>({
  api: '',
  appointmentBufferInMintues: 60,
  appointmentCoding: {},
  bailoutURL: '',
  callbacks: {
    onCancel: noOp,
    onClick: noOp,
    onChange: noOp,
    onError: noOp,
    onLoad: noOp,
    onDateChange: noOp,
    overrideTimeSlotSelect: noOp,
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
      name: '',
    },
  },
  description: '',
  returnURL: '',
  colors: generateColors(null, null),
  shadowRoot: null,
  date: new Date(),
  setDate: noOp,
  error: '',
  loading: false,
  screen: 'SELECT',
  setScreen: noOp,
  providers: [],
  setProviders: noOp,
  timeSlot: {
    start: '',
    end: '',
    provider: {
      name: '',
      id: '',
    },
  },
  setTimeSlot: noOp,
  resetTimeSlot: noOp,
  fetchTimeSlots: noOp,
  fetchScheduledAppointment: noOp,
  fetchProviders: noOp,
  createAppointment: noOp,
  cancelAppointment: noOp,
  initialized: false,
  setInitialized: noOp,
  onLoad: noOp,
  sortProviders: false,
})

const blankTimeSlot = () => ({
  start: '',
  end: '',
  provider: {
    name: '',
    id: '',
  },
})

export const ContextWrapper = ({ children, values }: ContextWrapperProps) => {
  const [screen, setScreen] = useState<string>(values.screen)
  const [date, setDate] = useState<Date>(new Date())
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | string[]>('')
  const [providers, setProviders] = useState<ProvidersType[]>([])
  const [preloadTimeSlot, setPreloadTimeSlot] = useState<TimeSlotType>(values.preloadBooking)
  const [timeSlot, setTimeSlot] = useState<TimeSlotType>(values.timeSlot)
  const [initialized, setInitialized] = useState<boolean>(false)

  const handleError: HandleErrorType = (error, msg) => {
    values.callbacks?.onError(error, msg)
    if (msg && typeof msg === 'string') setError(msg)
  }

  const resetTimeSlot = () => {
    setTimeSlot(blankTimeSlot())
    setPreloadTimeSlot(blankTimeSlot())
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
    [date, values, initialized]
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

  const fetchProviders = useCallback(() => {
    getPractitioners({
      onError: handleError,
      setProviders,
      api: values.api,
      patientId: values.patientId,
      patientKey: values.patientKey,
      providerIds: values.providerIds,
    })
  }, [values])

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
      preloadBooking: preloadTimeSlot,
      setTimeSlot,
      resetTimeSlot,
      fetchTimeSlots,
      fetchScheduledAppointment,
      fetchProviders,
      createAppointment,
      cancelAppointment,
      initialized,
      setInitialized,
      onLoad: values.callbacks?.onLoad || noOp,
    }
  }, [screen, date, loading, error, timeSlot, initialized])

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)
