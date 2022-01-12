import { h, render } from 'preact'
import { cssStyles } from '@canvas/common'
import { StyleSheetManager } from 'styled-components'
import { App } from './App'

const StyledApp = ({ rootId, brandColor }) => {
  return (
    <StyleSheetManager target={document.querySelector(`#${rootId}`).shadowRoot}>
      <App brandColor={brandColor} />
    </StyleSheetManager>
  )
}

export const init = ({ rootId, brandColor }) => {
  const appRoot = document.querySelector(`#${rootId}`)
  appRoot.attachShadow({
    mode: 'open',
  })

  const styleTag = document.createElement('style')
  styleTag.innerHTML = cssStyles
  appRoot.shadowRoot.appendChild(styleTag)

  render(
    <StyledApp rootId={rootId} brandColor={brandColor} />,
    appRoot.shadowRoot
  )
}
