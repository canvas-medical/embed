import { h } from 'preact'
import { AppContainer, Body, Error, Header } from '@canvas-medical/embed-common'
import { useAppContext } from './hooks'
import { Confirmation, TimeSlotSelect } from './components'
import { useEffect, useState } from 'preact/hooks'

export const App = () => {
  const { bailoutURL, colors, screen, error, fontFamily, fetchProviders, initialized, onLoad } = useAppContext()

  const [loadStartTime] = useState(new Date())

  useEffect(() => {
    fetchProviders()
  }, [])

  useEffect(() => {
    if (initialized) {
      onLoad((new Date().getTime() - loadStartTime.getTime()))
    }
  }, [initialized, loadStartTime])

  return (
    <AppContainer fontFamily={fontFamily}>
      <Header
        bailoutURL={bailoutURL}
        colors={colors}
        title="Schedule an Appointment"
      />
      {error && error.length ? (
        <Error errorMessages={error} />
      ) : screen !== 'CONFIRM' ? (
        <Body>
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
