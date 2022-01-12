import { createContext } from 'preact'
import { useContext } from 'preact/hooks'

export const AppContext = createContext({
  shadowRoot: null,
  colors: {
    primary: null,
    accent: null,
    focus: null,
  },
})

export const useAppContext = () => useContext(AppContext)
