import { h, createContext } from 'preact'
import { useContext, useState, useMemo } from 'preact/hooks'

export const AppContext = createContext({
  api: null,
  appointmentTypeCode: null,
  bailoutURL: null,
  shadowRoot: null,
  patientId: null,
  patientKey: null,
  providerIds: null,
  locationId: null,
  treatment: null,
  reason: null,
  duration: null,
  colors: {
    primary: null,
    accent: null,
    focus: null,
  },
  screen: null,
  setScreen: () => {},
  date: null,
  setDate: () => {},
})

export const ContextWrapper = ({ children, values }) => {
  const [screen, setScreen] = useState('SELECT')
  const [date, setDate] = useState(new Date())
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
      timeSlot,
      setTimeSlot,
    }
  }, [values, screen, setScreen, date, setDate, timeSlot])

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)
