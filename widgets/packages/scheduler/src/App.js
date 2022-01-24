import { h } from 'preact'
import { AppContainer, Body, Header } from '@canvas/common'
import { DateSelect, TimeSlotSelect, Confirmation } from './components'
import { useAppContext } from './hooks'

export const App = () => {
  const { screen, colors, bailoutURL } = useAppContext()

  return (
    <AppContainer>
      <Header
        colors={colors}
        bailoutURL={bailoutURL}
        title="Schedule an Appointment"
      />
      {screen === 'SELECT' ? (
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
