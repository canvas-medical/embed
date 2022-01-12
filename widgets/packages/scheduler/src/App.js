import { h } from 'preact'
import { useState } from 'preact/hooks'
import { AppContainer, Body, generateColors, Header } from '@canvas/common'
import { DateSelect, TimeSlotSelect } from './components'

export const App = ({ brandColor }) => {
  const [screen, setScreen] = useState('SELECT')
  const [date, setDate] = useState(new Date())

  const generatedColors = generateColors(brandColor)
  const orchestratedColors = { primary: brandColor, ...generatedColors }

  return (
    <AppContainer>
      <Header colors={orchestratedColors} bailoutURL={'https://viget.com'} />
      {screen === 'SELECT' ? (
        <Body>
          <DateSelect
            date={date}
            colors={orchestratedColors}
            setDate={setDate}
          />
          <TimeSlotSelect
            colors={orchestratedColors}
            setScreen={() => setScreen('CONFIRM')}
          />
        </Body>
      ) : (
        <Body>
          Confirm Screen Inprogress
          <button onClick={() => setScreen('SELECT')}>Return to Select</button>
        </Body>
      )}
    </AppContainer>
  )
}
