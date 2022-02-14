import { h } from 'preact'
import { AppContainer, Body, Error, Header } from '@canvas/embed-common'
import { useAppContext } from './hooks'
import { Confirmation, DateSelect, TimeSlotSelect } from './components'

export const App = () => {
  const { bailoutURL, colors, screen, error } = useAppContext()
  return (
    <AppContainer>
      <Header
        bailoutURL={bailoutURL}
        colors={colors}
        title="Schedule an Appointment"
      />
      {error && error.length ? (
        <Error errorMessages={error} />
      ) : screen !== 'CONFIRM' ? (
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
