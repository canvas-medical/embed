import { h, render } from 'preact'
import { cssStyles, generateColors, getAppointmentType } from '@canvas/common'
import { StyleSheetManager } from 'styled-components'
import { App } from './App'
import { ContextWrapper } from './hooks'

const StyledApp = ({
  appointmentTypeCode,
  bailoutURL,
  brandColor,
  duration,
  locationId,
  patientId,
  providerIds,
  reason,
  rootId,
}) => {
  const shadowRoot = document.querySelector(`#${rootId}`).shadowRoot
  const colors = generateColors(brandColor)
  const treatment = getAppointmentType(appointmentTypeCode).type

  return (
    <StyleSheetManager target={document.querySelector(`#${rootId}`).shadowRoot}>
      <ContextWrapper
        values={{
          bailoutURL,
          shadowRoot,
          colors,
          patientId,
          providerIds,
          locationId,
          appointmentTypeCode,
          treatment,
          reason,
          duration,
        }}
      >
        <App brandColor={brandColor} shadowRoot={shadowRoot} />
      </ContextWrapper>
    </StyleSheetManager>
  )
}

export const init = ({
  bailoutURL,
  rootId,
  patientId,
  providerIds,
  locationId,
  appointmentTypeCode,
  reason,
  duration,
  brandColor,
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
      bailoutURL={bailoutURL}
      rootId={rootId}
      patientId={patientId}
      providerIds={providerIds}
      locationId={locationId}
      appointmentTypeCode={appointmentTypeCode}
      reason={reason}
      duration={duration}
      brandColor={brandColor}
    />,
    appRoot.shadowRoot
  )
}
