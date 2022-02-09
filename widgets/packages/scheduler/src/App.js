import { h } from 'preact'
import { AppContainer, Body, Error, Header } from '@canvas/common'
import { DateSelect, TimeSlotSelect, Confirmation } from './components'
import { useAppContext } from './hooks'

export const App = () => {
  const { screen, colors, bailoutURL, error } = useAppContext()

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
          {error ? <Error errorMessage={error} /> : <TimeSlotSelect />}
        </Body>
      ) : (
        <Body>{error ? <Error errorMessage={error} /> : <Confirmation />}</Body>
      )}
    </AppContainer>
  )
}
