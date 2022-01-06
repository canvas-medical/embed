import { h, render } from 'preact'
import { Demo, StyledDemo } from '@canvas/common'
import styles from './styles.css'
import styled, { StyleSheetManager } from 'styled-components'

const StyledExample = styled.div`
  display: flex;
  flex-direction: column;
  background-color: green;
`

const App = ({ rootId }) => {
  return (
    <StyleSheetManager target={document.querySelector(`#${rootId}`).shadowRoot}>
      <StyledExample>
        <h1>Appointments</h1>
        <StyledDemo>This is the appointments app</StyledDemo>
        <Demo text="electric boogie" />
      </StyledExample>
    </StyleSheetManager>
  )
}

export const init = ({ rootId }) => {
  const appRoot = document.querySelector(`#${rootId}`)
  appRoot.attachShadow({
    mode: 'open',
  })

  const styleTag = document.createElement('style')
  styleTag.innerHTML = styles
  appRoot.shadowRoot.appendChild(styleTag)

  render(<App rootId={rootId} />, appRoot.shadowRoot)
}
