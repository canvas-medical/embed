import { h, createContext, ComponentChildren, PreactContext } from 'preact'
import { useState, useMemo, useContext } from 'preact/hooks'
import { generateColors, GeneratedColorsType } from '@canvas/embed-common'

type AppContextType = {
  bailoutURL: string
  colors: GeneratedColorsType
  shadowRoot: ShadowRoot | null
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
  bailoutURL: '',
  colors: generateColors(null, null),
  shadowRoot: null,
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
    }
  }, [screen, date, loading, error, timeSlot])

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)
