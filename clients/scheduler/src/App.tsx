import { h } from 'preact'
import { AppContainer, Body, Header } from '@canvas/embed-common'
import { useAppContext } from './hooks'
import { DateSelect, TimeSlotSelect } from './components'

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
        <DateSelect />
        <TimeSlotSelect />
      </Body>
    </AppContainer>
  )
}
