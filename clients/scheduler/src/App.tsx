import { h } from 'preact'
import { AppContainer, Body, Header } from '@canvas/embed-common'
import { useAppContext } from './hooks'
import { Confirmation, DateSelect, TimeSlotSelect } from './components'

export const App = () => {
  const { bailoutURL, colors, screen } = useAppContext()
  return (
    <AppContainer>
      <Header
        bailoutURL={bailoutURL}
        colors={colors}
        title="Schedule an Appointment"
      />
      {screen !== 'CONFIRM' ? (
        <Body>
          <DateSelect />
          <TimeSlotSelect />
        </Body>
      ) : (
        <Body>
          <Confirmation />
        </Body>
      )}
    </AppContainer>
  )
}
