import { h, createContext, ComponentChildren } from 'preact'
import { useState, useMemo, useContext, useCallback } from 'preact/hooks'
import {
  generateColors,
  GeneratedColorsType,
  getTimeSlots,
  ProvidersType,
} from '@canvas/embed-common'

type AppContextType = {
  api: string
  bailoutURL: string
  duration: number
  locationId: string
  patientId: string
  patientKey: string
  providers: ProvidersType[]
  colors: GeneratedColorsType
  shadowRoot: ShadowRoot | null
  loading: boolean
  timeSlot: TimeSlotType | null
  setTimeSlot: Function
  fetchTimeSlots: Function
}

type ContextWrapperProps = {
  children: ComponentChildren
  values: AppContextType
}

type TimeSlotType = {
  start: string | null
  end: string | null
  provider: {
    name: string
    id: string
  } | null
}

export const AppContext = createContext<AppContextType>({
  api: '',
  bailoutURL: '',
  duration: 20,
  locationId: '',
  patientId: '',
  patientKey: '',
  providers: [],
  colors: generateColors(null, null),
  shadowRoot: null,
  loading: false,
  timeSlot: null,
  setTimeSlot: () => {},
  fetchTimeSlots: () => {},
})

export const ContextWrapper = ({ children, values }: ContextWrapperProps) => {
  const [screen, setScreen] = useState<string>('SELECT')
  const [date, setDate] = useState<Date>(new Date())
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [timeSlot, setTimeSlot] = useState<TimeSlotType>({
    start: null,
    end: null,
    provider: null,
  })

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
      fetchTimeSlots,
    }
  }, [screen, date, loading, error, timeSlot])

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)
