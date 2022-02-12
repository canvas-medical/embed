import { h } from 'preact'
import { Header } from '@canvas/embed-common'
import { useAppContext } from './hooks'

export const App = () => {
  const { bailoutURL, colors } = useAppContext()
  return (
    <Header
      bailoutURL={bailoutURL}
      colors={colors}
      title="Schedule an Appointment"
    />
  )
}
