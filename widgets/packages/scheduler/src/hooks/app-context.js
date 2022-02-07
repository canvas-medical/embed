import { h, createContext } from 'preact'
import { useContext, useState, useMemo } from 'preact/hooks'

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
    }
  }, [values, screen, date, error, timeSlot])

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)
