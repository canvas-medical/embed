import { h } from 'preact'
import { AppContainer, Body, Header } from '@canvas/embed-common'
import { useAppContext } from './hooks'
import { TimeSlotSelect } from './components/time-slot-select'

export const App = () => {
  const { bailoutURL, colors } = useAppContext()
  return (
    <AppContainer>
      <Header
        bailoutURL={bailoutURL}
        colors={colors}
        title="Schedule an Appointment"
      />
      <Body>
        <TimeSlotSelect />
      </Body>
    </AppContainer>
  )
}
