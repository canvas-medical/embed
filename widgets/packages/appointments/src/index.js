import { h, render } from 'preact'
import { cssStyles, generateColors } from '@canvas/common'
import { StyleSheetManager } from 'styled-components'
import { App } from './App'

const StyledApp = ({
  api,
  bailoutURL,
  brandColor,
  locationId,
  patientId,
  patientKey,
  providers,
  rootId,
}) => {
  const shadowRoot = document.querySelector(`#${rootId}`).shadowRoot
  const colors = generateColors(brandColor)

  return (
    <StyleSheetManager target={shadowRoot}>
      <App
        api={api}
        bailoutURL={bailoutURL}
        locationId={locationId}
        patientId={patientId}
        patientKey={patientKey}
        providers={providers}
        colors={colors}
        shadowRoot={shadowRoot}
      />
    </StyleSheetManager>
  )
}

export const init = ({
  api,
  bailoutURL,
  brandColor,
  locationId,
  patientId,
  patientKey,
  providers,
  returnURL,
  rootId,
}) => {
  const appRoot = document.querySelector(`#${rootId}`)
  appRoot.attachShadow({
    mode: 'open',
  })

  const styleTag = document.createElement('style')
  styleTag.innerHTML = cssStyles
  appRoot.shadowRoot.appendChild(styleTag)

  render(
    <StyledApp
      api={api}
      bailoutURL={bailoutURL}
      brandColor={brandColor}
      locationId={locationId}
      patientId={patientId}
      patientKey={patientKey}
      providers={providers}
      returnURL={returnURL}
      rootId={rootId}
    />,
    appRoot.shadowRoot
  )
}
