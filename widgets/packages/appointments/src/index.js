import { h, render } from 'preact'
import styles from './styles.css'
import { StyleSheetManager } from 'styled-components'
import { App } from './App'

const StyledApp = ({ rootId }) => {
  return (
    <StyleSheetManager target={document.querySelector(`#${rootId}`).shadowRoot}>
      <App />
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

  render(<StyledApp rootId={rootId} />, appRoot.shadowRoot)
}
