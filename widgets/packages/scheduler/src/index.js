import { h, render } from 'preact'
import { cssStyles, generateColors, getAppointmentType } from '@canvas/common'
import { StyleSheetManager } from 'styled-components'
import { App } from './App'
import { ContextWrapper } from './hooks'

const StyledApp = ({
  api,
  appointmentTypeCode,
  bailoutURL,
  brandColor,
  duration,
  locationId,
  patientId,
  patientKey,
  providers,
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
          api,
          bailoutURL,
          shadowRoot,
          colors,
          patientId,
          patientKey,
          providers,
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
  appointmentTypeCode,
  api,
  bailoutURL,
  rootId,
  patientId,
  patientKey,
  providers,
  locationId,
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
      api={api}
      bailoutURL={bailoutURL}
      rootId={rootId}
      patientId={patientId}
      patientKey={patientKey}
      providers={providers}
      locationId={locationId}
      appointmentTypeCode={appointmentTypeCode}
      reason={reason}
      duration={duration}
      brandColor={brandColor}
    />,
    appRoot.shadowRoot
  )
}
