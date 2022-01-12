import { h, render } from 'preact'
import { cssStyles, generateColors } from '@canvas/common'
import { StyleSheetManager } from 'styled-components'
import { App } from './App'
import { AppContext } from './hooks'

const StyledApp = ({ rootId, brandColor }) => {
  const shadowRoot = document.querySelector(`#${rootId}`).shadowRoot
  const generatedColors = generateColors(brandColor)
  const colors = { primary: brandColor, ...generatedColors }

  return (
    <StyleSheetManager target={document.querySelector(`#${rootId}`).shadowRoot}>
      <AppContext.Provider value={{ shadowRoot, colors }}>
        <App brandColor={brandColor} shadowRoot={shadowRoot} />
      </AppContext.Provider>
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
