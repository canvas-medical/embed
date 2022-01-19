import { h, render } from 'preact'
import { cssStyles, generateColors } from '@canvas/common'
import { StyleSheetManager } from 'styled-components'
import { App } from './App'

const StyledApp = ({ bailoutURL, brandColor, rootId }) => {
  const shadowRoot = document.querySelector(`#${rootId}`).shadowRoot
  const colors = generateColors(brandColor)

  return (
    <StyleSheetManager target={shadowRoot}>
      <App bailoutURL={bailoutURL} colors={colors} />
    </StyleSheetManager>
  )
}

export const init = ({ bailoutURL, brandColor, rootId }) => {
  const appRoot = document.querySelector(`#${rootId}`)
  appRoot.attachShadow({
    mode: 'open',
  })

  const styleTag = document.createElement('style')
  styleTag.innerHTML = cssStyles
  appRoot.shadowRoot.appendChild(styleTag)

  render(
    <StyledApp
      bailoutURL={bailoutURL}
      brandColor={brandColor}
      rootId={rootId}
    />,
    appRoot.shadowRoot
  )
}
